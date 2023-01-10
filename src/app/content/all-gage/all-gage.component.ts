import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../_interface/api-response";
import {HttpErrorResponse} from "@angular/common/http";
import {GagePage} from "../../_interface/gage-page";
import {StorageService} from "../../_services/storage.service";
import {FlatService} from "../../_services/flat.service";
import {GageService} from "../../_services/gage.service";
import {map} from "rxjs/operators";
import {ModalDismissReasons, NgbDate, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {TypeGage} from "../../_interface/type-gage";
import {GageAddress} from "../../_interface/gage-address";
import {FlatPage} from "../../_interface/flat-page";

@Component({
  selector: 'app-all-gage',
  templateUrl: './all-gage.component.html',
  styleUrls: ['./all-gage.component.css']
})
export class AllGageComponent implements OnInit {

  isLoggedIn = false;
  gageState$ = Observable<{ appState: string, appData?: ApiResponse<GagePage>, error?: HttpErrorResponse }>;
  private responseSubject = new BehaviorSubject<ApiResponse<GagePage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  closeResult: string;

  gageModel: any;
  typeGages: TypeGage[];
  gagesAddress: GageAddress[];
  installationDate: NgbDate;

  deleteId: string;

  @ViewChild('content') addView!: ElementRef;
  @ViewChild('contentDelete') deleteView!: ElementRef;

  constructor(private storageService: StorageService,
              private flatService: FlatService,
              private gageService: GageService,
              private modalService: NgbModal,) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // @ts-ignore
      this.gageService.getTypeGages()
        .subscribe((result) => {
          this.typeGages = result;
          console.log("@@", this.typeGages);
        });

      this.flatService.getGageAddress()
        .subscribe((result) => {
          this.gagesAddress = result;
          console.log("@@", this.gagesAddress);
        });

      // @ts-ignore
      this.gageState$ = this.gageService.gageData$().pipe(
        map((response: ApiResponse<GagePage>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          console.log("!!!!!!!!!!!!!!!", response);
          return ({appState: 'APP_LOADED', appData: response});
        }),
        startWith({appState: 'APP_LOADING'}),
        catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
      );
    }

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
    this.gageModel = Object.assign({}, form.value);
    console.log("!!!!!!!!!!!!!!!", form.value);
    this.gageService.postGage(form.value)
      .subscribe((result) => {
        console.log("!!!!!!!!!!!!!!!", result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal*/
  }

  deleteGage() {
    this.gageService.deleteGage(this.deleteId)
      .subscribe((result) => {
        console.log("!!!!!!!!!!!!!!!", result);
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }

  openContentDelete(id: any) {
    this.deleteId = id;
    console.log("!!!!!!!!!!!!!!!",  this.deleteId);
    this.modalService.open(this.deleteView, { centered: true,  backdrop: 'static',  size: 'lg' });
  }

  goToPage(pageNumber: number = 0): void {
    // @ts-ignore
    this.gageState$ = this.gageService.gageData$(pageNumber).pipe(
      map((response: ApiResponse<GagePage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        //console.log("!!!!!!!!!!!!!!!", response);
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
