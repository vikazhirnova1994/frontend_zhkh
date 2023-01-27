import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ClaimService} from "../../_services/claim.service";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../_interface/api-response";
import {HttpErrorResponse} from "@angular/common/http";
import {UserClaimPage} from "../../_interface/user-claim-page";
import {map} from "rxjs/operators";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-claims',
  templateUrl: './user-claims.component.html',
  styleUrls: ['./user-claims.component.css']
})
export class UserClaimsComponent implements OnInit {

  private isLoggedIn = false;
  public claimDateState$ = Observable<{ appState: string, appData?: ApiResponse<UserClaimPage>, error?: HttpErrorResponse }>;
  public responseSubject = new BehaviorSubject<ApiResponse<UserClaimPage>>(null);
  public currentPageSubject = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPageSubject.asObservable();
  public closeResult: string;
  public claimModel: any;
  public userAddress: any;

  constructor(private storageService: StorageService,
              private claimService: ClaimService,
              private modalService: NgbModal) { }

  @ViewChild('content') addView!: ElementRef;

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log("this.isLoggedIn", this.isLoggedIn);

    if (this.isLoggedIn) {
      this.userAddress = this.storageService.getAddress();
      // @ts-ignore
      this.claimDateState$ = this.claimService.userClaimData$().pipe(
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openModel() {
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

  onSubmit(form: NgForm) {
    this.claimModel = Object.assign({}, form.value);
    console.log("!!!!!!!!!!!!!!!", form.value);
    this.claimService.postClam(form.value)
      .subscribe((result) => {
        console.log("postGage: ", result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll();
  }

  goToPage(pageNumber: number = 0): void {
    // @ts-ignore
    this.claimDateState$= this.gageService.claimData$(pageNumber).pipe(
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

  goToPreviousOrNextPage(direction?: string): void {
    this.goToPage(direction === 'forward'
      ? this.currentPageSubject.value + 1
      : this.currentPageSubject.value - 1);
  }
}
