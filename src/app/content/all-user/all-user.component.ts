import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../_interface/api-response";
import {HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {UserService} from "../../_services/user.service";
import { UserPage } from 'src/app/_interface/user-page';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  public isLoggedIn = false;
  public userState$ = Observable<{ appState: string, appData?: ApiResponse<UserPage>, error?: HttpErrorResponse }>;
  public responseSubject = new BehaviorSubject<ApiResponse<UserPage>>(null);
  public currentPageSubject = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPageSubject.asObservable();
  public closeResult: string;
  public roles: String[];
  public contractNumbers: String[];

  public userModel: any;
  public userForm: FormGroup;
  public deleteId: string;

  @ViewChild('content') addView!: ElementRef;
  @ViewChild('contentDetails') detailView!: ElementRef;
  @ViewChild('contentEdit') editView!: ElementRef;
  @ViewChild('contentDelete') deleteView!: ElementRef;

  constructor(private storageService: StorageService,
              private userService: UserService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    this.createUserForm();

    if (this.isLoggedIn) {
      // @ts-ignore
      this.userState$ = this.userService.userData$().pipe(
        map((response: ApiResponse<UserPage>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          console.log("flatState$: ", response);
          return ({appState: 'APP_LOADED', appData: response});
        }),
        startWith({appState: 'APP_LOADING'}),
        catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
      );

      this.userService.getRoles()
        .subscribe((result) => {
          this.roles = result;
          console.log("GageAddress: ", this.roles);
        });

      this.userService.getContractNumbers()
        .subscribe((result) => {
          this.contractNumbers = result;
          console.log("GageAddress: ", this.roles);
        });

    }
  }


  goToPage(pageNumber: number = 0): void {
    // @ts-ignore
    this.userState$ = this.userService.userData$(pageNumber).pipe(
      map((response: ApiResponse<UserPage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log("userState$: ", response);
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
    console.log("form.value: ", form.value);
    this.userModel = Object.assign({}, form.value);
    this.userService.postUser(form.value)
      .subscribe((result) => {
        console.log("postFlat: ", result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({id: [''], username: [''], password : [''], roleName: [''], contractNumber: ['']});
  }

  openContentDetails(username: string, roleName: string, contractNumber: string) {
    console.log("username value: ", username.valueOf());
    console.log("username value: ", roleName.valueOf());
    console.log("username value: ", contractNumber.valueOf());
    this.modalService.open(this.detailView, {centered: true, backdrop: 'static', size: 'lg'});

    this.userForm.controls['username'].setValue(username.valueOf())
    this.userForm.controls['roleName'].setValue(roleName.valueOf())
    this.userForm.controls['contractNumber'].setValue(contractNumber.valueOf())
  }

  openContentDetailsForUpdate(id: any, username: any, roleName: any, contractNumber: any) {
    console.log("userForm.value.username: ", this.userForm.value.username);
    this.modalService.open(this.editView, {centered: true, backdrop: 'static', size: 'lg'});
    this.userForm.patchValue( {id: id, username: username,  roleName: roleName, contractNumber: contractNumber});

  }

  openContentDelete(id: any) {
    this.deleteId = id;
    console.log("!!!!!!!!!!!!!!!", this.deleteId);

    this.modalService.open(this.deleteView, {centered: true, backdrop: 'static', size: 'lg'});
  }

  onSaveEdit() {
    console.log("this.flatForm.value.id: ", this.userForm.value.id);
    this.userService.putUser(this.userForm.value, this.userForm.value.id)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }

  deleteFlat() {
    this.userService.deleteUser(this.deleteId)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
        this.modalService.dismissAll();
      });
  }
}
