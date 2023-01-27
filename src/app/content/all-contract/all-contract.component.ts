import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../_interface/api-response";
import {FlatPage} from "../../_interface/flat-page";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {StorageService} from "../../_services/storage.service";
import {ModalDismissReasons, NgbDate, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractService} from "../../_services/contract.service";
import {map} from "rxjs/operators";
import {ContractPage} from "../../_interface/contract-page";
import {GageAddress} from "../../_interface/gage-address";
import {FlatService} from "../../_services/flat.service";

@Component({
  selector: 'app-all-contract',
  templateUrl: './all-contract.component.html',
  styleUrls: ['./all-contract.component.css']
})
export class AllContractComponent implements OnInit {

  public contractState$ = Observable<{ appState: string, appData?: ApiResponse<ContractPage>, error?: HttpErrorResponse }>;
  public isLoggedIn = false;
  public responseSubject = new BehaviorSubject<ApiResponse<ContractPage>>(null);
  public currentPageSubject = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPageSubject.asObservable();
  public closeResult: string;
  public contractModel: any;
  public contractForm: FormGroup;
  public deleteId: string;
  public gagesAddress: GageAddress[];
  public signedDate: NgbDate;

  @ViewChild('content') addView!: ElementRef;
  @ViewChild('contentDelete') deleteView!: ElementRef;

  constructor(private storageService: StorageService,
              private contractService: ContractService,
              private flatService: FlatService,
              private http: HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.flatService.getGageAddress()
        .subscribe((result) => {
          this.gagesAddress = result;
          console.log("GageAddress: ", this.gagesAddress);
        });
      // @ts-ignore
      this.contractState$ = this.contractService.contractData$().pipe(
        map((response: ApiResponse<ContractPage>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          console.log("flatState$: ", response);
          return ({appState: 'APP_LOADED', appData: response});
        }),
        startWith({appState: 'APP_LOADING'}),
        catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
      );
    }
  }

  goToPage(pageNumber: number = 0): void {
    // @ts-ignore
    this.contractState$ = this.contractService.contractData$(pageNumber).pipe(
      map((response: ApiResponse<ContractPage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log("flatState$: ", response);
        return ({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
    );
  }

  goToPreviousOrNextPage(direction?: string): void {
    this.goToPage(direction === 'forward'
      ? this.currentPageSubject.value + 1
      : this.currentPageSubject.value - 1);
  }

  openContent() {
    this.modalService.open(this.addView, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(form: NgForm) {
    this.contractModel = Object.assign({}, form.value);
    console.log("!!!!!!!!!!!!!!!", form.value);
    this.contractService.postContract(form.value)
      .subscribe((result) => {
        console.log("postGage: ", result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal*/
  }

  deleteContract() {
    this.contractService.deleteContract(this.deleteId)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }

  openContentDelete(id: any) {
    this.deleteId = id;
    console.log("!!!!!!!!!!!!!!!", this.deleteId);
    this.modalService.open(this.deleteView, {centered: true, backdrop: 'static', size: 'lg'});
  }
}
