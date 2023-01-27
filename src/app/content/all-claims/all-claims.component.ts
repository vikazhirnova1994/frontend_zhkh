import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../_interface/api-response";
import {UserClaimPage} from "../../_interface/user-claim-page";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../../_services/storage.service";
import {ClaimService} from "../../_services/claim.service";
import {NgbDate, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {ExcelBorder} from "ag-grid-community";
import {ExcelService} from "../../_services/excel.service";

@Component({
  selector: 'app-all-claims',
  templateUrl: './all-claims.component.html',
  styleUrls: ['./all-claims.component.css']
})
export class AllClaimsComponent implements OnInit {

  private isLoggedIn = false;
  public userClaimDateState$ = Observable<{ appState: string, appData?: ApiResponse<UserClaimPage>, error?: HttpErrorResponse }>;
  public responseSubject = new BehaviorSubject<ApiResponse<UserClaimPage>>(null);
  public currentPageSubject = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPageSubject.asObservable();
  public closeResult: string;
  public claimModel: any;
  public claimForm: FormGroup;
  public deleteId: string;
  public completion: NgbDate;

  @ViewChild('contentEdit') editView!: ElementRef;
  @ViewChild('contentComplete') deleteView!: ElementRef;

  constructor(private storageService: StorageService,
              private claimService: ClaimService,
              private excelService: ExcelService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log("this.isLoggedIn", this.isLoggedIn);

    this.createClaimForm();

    if (this.isLoggedIn) {
      // @ts-ignore
      this.userClaimDateState$ = this.claimService.claimData$().pipe(
        map((response: ApiResponse<UserClaimPage>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          console.log("claimDateState$ result: ", response);
          return ({appState: 'APP_LOADED', appData: response});
        }),
        startWith({appState: 'APP_LOADING'}),
        catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
      );
    }
  }

  goToPage(status?: string, pageNumber: number = 0): void {
    // @ts-ignore
    this.userClaimDateState$ = this.claimService.claimData$(status, pageNumber).pipe(
      map((response: ApiResponse<UserClaimPage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log("gageState$: ", response);
        return ({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
    );
  }

 goToPreviousOrNextPage(direction?: string, status?: string): void {
  this.goToPage(status, direction === 'forward'
      ? this.currentPageSubject.value + 1
      : this.currentPageSubject.value - 1);
  }

  createClaimForm() {
    this.claimForm = this.formBuilder.group({
      id: [''], contractNumber: [''], address: [''],
      description: [''], executorIdentificationNumber: [''], creationDate: [''], completionDate: [''],
      status: ['']
    });
  }

  onSaveEdit() {
    console.log("this.flatForm.value.id: ", this.claimForm.value.id);
    console.log("this.flatForm.value.status: ", this.claimForm.value.status);
    this.claimService.putClamStatus(this.claimForm.value, this.claimForm.value.id)
      .subscribe((result) => {
        console.log("!!!!!!!!!!!!!!!", result);
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }

  completeClaim() {
    this.claimService.completeClaim(this.deleteId)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }

  openContentComplete(id: any) {

    this.deleteId = id;
    console.log("!!!!!!!!!!!!!!!", this.deleteId);
    this.modalService.open(this.deleteView, {centered: true, backdrop: 'static', size: 'lg'});
  }

  openContentUpdate(id: string, contractNumber: string, address: string, description: string,
                    executorIdentificationNumber: string, creationDate: string,
                    completionDate: string, status: string) {
    console.log("userForm.value.contractNumber: ", this.claimForm.value.contractNumber);
    this.modalService.open(this.editView, {centered: true, backdrop: 'static', size: 'lg'});
    this.claimForm.patchValue({
      id: id, contractNumber: contractNumber, address: address,
      description: description, creationDate: creationDate, completionDate: completionDate, status: status
    });
  }

  exportExcel() {
    this.claimService.getClaimsForExportToExcel().subscribe(
      data => {
        this.excelService.exportClaimsToExcel(data);
      }
    );
  }
}
