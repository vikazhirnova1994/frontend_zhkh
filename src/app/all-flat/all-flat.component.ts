import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../_services/storage.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {map} from "rxjs/operators";
import {FlatPage} from "../_interface/flat-page";
import {FlatService} from "../_services/flat.service";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {FlatData} from "../_interface/flat-data";


export class Flat {
  constructor(
    public  city: string,
    public street: string,
    public houseNumber: string,
    public entrance: string,
    public flatNumber: string,
  ) {

  }
}

@Component({
  selector: 'app-all-flat',
  templateUrl: './all-flat.component.html',
  styleUrls: ['./all-flat.component.css']
})
export class AllFlatComponent implements OnInit {

  isLoggedIn = false;
  flatState$ = Observable<{ appState: string, appData?: ApiResponse<FlatPage>, error?: HttpErrorResponse }>;
  private responseSubject = new BehaviorSubject<ApiResponse<FlatPage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  closeResult: string;
  flatModel: any;
  flatForm: FormGroup;

  flatDetailsModel: any;
  deleteId: string;

  @ViewChild('content') addView!: ElementRef;
  @ViewChild('contentDetails') detailView!: ElementRef;
  @ViewChild('contentEdit') editView!: ElementRef;
  @ViewChild('contentDelete') deleteView!: ElementRef;

  constructor(private storageService: StorageService,
              private flatService: FlatService,
              private http: HttpClient,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.createFlatForm();
    if (this.isLoggedIn) {
      // @ts-ignore
      this.flatState$ = this.flatService.flatData$().pipe(
        map((response: ApiResponse<FlatPage>) => {
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

  goToPage(pageNumber: number = 0): void {
    // @ts-ignore
    this.flatState$ = this.flatService.flatData$(pageNumber).pipe(
      map((response: ApiResponse<FlatPage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log("!!!!!!!!!!!!!!!", response);
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

  saveFlat() {
    console.log("!!!!!!!!!!!!!!!", this.flatForm.value);
    this.flatService.postFlat(this.flatForm.value)
      .subscribe((result) => {
        //console.log("!!!!!!!!!!!!!!!", result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openContent() {
    this.modalService.open(this.addView, { centered: true,  backdrop: 'static',  size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  createFlatForm(){
    this.flatForm = this.formBuilder.group(
      { id:[''],  city: [''],  street: [''],  houseNumber:[''],  entrance: [],  flatNumber:[] } );
  }

 openContentDetails(city: string, street: string, houseNumber: string, entrance: string, flatNumber: string) {
    //console.log("!!!!!!!!!!!!!!!", city.valueOf());
    this.modalService.open(this.detailView, {centered: true,  backdrop: 'static',    size: 'lg' });
    this.flatForm.controls['city'].setValue(city.valueOf())
    this.flatForm.controls['street'].setValue(street.valueOf())
    this.flatForm.controls['houseNumber'].setValue(houseNumber.valueOf())
    this.flatForm.controls['entrance'].setValue(entrance.valueOf())
    this.flatForm.controls['flatNumber'].setValue(flatNumber.valueOf())
  }
  openContentDetailsForUpdate(id: any, city: any, street: any, houseNumber: any, entrance: any, flatNumber: any) {
    // console.log("!!!!!!!!!!!!!!!",   this.flatForm.value.flatNumber);
    this.modalService.open(this.editView, { centered: true, backdrop: 'static',  size: 'lg'  });
    this.flatForm.patchValue(
      { id: id, city: city,  street: street,  houseNumber: houseNumber,  entrance: entrance,  flatNumber: flatNumber, });
  }

  openContentDelete(id: any) {
    this.deleteId = id;
    console.log("!!!!!!!!!!!!!!!",  this.deleteId);

    this.modalService.open(this.deleteView, { centered: true,  backdrop: 'static',  size: 'lg' });
  }

  onSubmit(form: NgForm) {
    console.log("!!!!!!!!!!!!!!!", form.value);

 this.flatModel = Object.assign({}, form.value);
    console.log("!!!!!!!!!!!!!!!", form.value);
    this.flatService.postFlat(form.value)
      .subscribe((result) => {
        console.log("!!!!!!!!!!!!!!!", result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  onSaveEdit() {
   // console.log("!!!!!!!!!!!!!!!",   this.flatForm.value.id);
    this.flatService.putFlat(this.flatForm.value, this.flatForm.value.id)
      .subscribe((result) => {
       // console.log("!!!!!!!!!!!!!!!", result);
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }

  deleteFlat() {
       this.flatService.deleteFlat(this.deleteId)
         .subscribe((result) => {
           console.log("!!!!!!!!!!!!!!!", result);
           this.ngOnInit(); //reload the table
           this.modalService.dismissAll();
         });
  }
}
