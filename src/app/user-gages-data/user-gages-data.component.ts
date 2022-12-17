import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../interface/api-response";
import {Page} from "../interface/page";
import {GageDataService} from "../_services/gage.data.service";
import {map} from "rxjs/operators";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-gages-data',
  templateUrl: './user-gages-data.component.html',
  styleUrls: ['./user-gages-data.component.css']
})
export class UserGagesDataComponent implements OnInit {

  isLoggedIn = false;
  gageDateSate$ = Observable<{ appState:string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }>;
  private responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  closeResult: string;
  gageDataModel:any;

  constructor(private storageService: StorageService, private http: HttpClient,
              private gagaDataService: GageDataService,
              private modalService: NgbModal) {
  }

  @ViewChild('content') addView!: ElementRef
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){

      // @ts-ignore
      this.gageDateSate$ = this.gagaDataService.gageData$().pipe(
        map((response: ApiResponse<Page>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
            console.log("!!!!!!!!!!!!!!!", response);
            return ( { appState: 'APP_LOADED', appData: response });
          }),
        startWith ( { appState: 'APP_LOADING'}),
        catchError((error: HttpErrorResponse) => of( { appState: 'APP_ERROR', error}))
      );
    }
  }

  gageForm= new FormGroup({
    electricityDay: new FormControl(),
    electricityNight: new FormControl(),
    waterHot: new FormControl(),
    waterCool: new FormControl(),
    energy: new FormControl()
  });

  saveGageDate(){
   // console.log("!!!!!!!!!!!!!!!", this.gageForm.value);
      this.gagaDataService.postGageData(this.gageForm.value)
          .subscribe((result) => {
            console.log("!!!!!!!!!!!!!!!", result);
            this.ngOnInit(); //reload the table
          });
    this.modalService.dismissAll(); //dismiss the modal
  }

  goToPage(serialNumber?: string, pageNumber: number = 0): void {
    // @ts-ignore
    this.gageDateSate$ = this.gagaDataService.gageData$(serialNumber, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);

        console.log("!!!!!!!!!!!!!!!", response);
        return ( { appState: 'APP_LOADED', appData: response });
      }),
      startWith ( { appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse) => of( { appState: 'APP_ERROR', error}))
    );
  }

  goToPreviousOrNextPage(direction?: string, serialNumber?: string): void {
   this.goToPage(serialNumber,direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value -1);
  }

  openModel(/*content: TemplateRef<any>*/) {
    this.modalService.open(this.addView, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    this.gageDataModel = Object.assign({}, form.value);
    console.log("!!!!!!!!!!!!!!!", this.gageDataModel);
  /*  this.gagaDataService.postGageData(f.value)
      .subscribe((result) => {
        console.log("!!!!!!!!!!!!!!!", result);
       // this.ngOnInit(); //reload the table
      });*/
    this.modalService.dismissAll(); //dismiss the modal
  }

  //postFlat(){
  //     this.flatModel = Object.assign({}, this.flatForm.value);
  //     this.api.postFlat(this.flatModel).subscribe(res=> {
  //       alert("Flat added successfully");
  //       let close = document.getElementById('close');
  //       close?.click();
  //       this.flatForm.reset();
  //       //this.getAllFlat();
  //     }, err => {
  //       alert("Error");
  //     })
  //   }
}
