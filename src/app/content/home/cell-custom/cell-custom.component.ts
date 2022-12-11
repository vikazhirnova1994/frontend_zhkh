import {Component, OnInit, TemplateRef} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from "../home.component";


@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.css']
})
export class CellCustomComponent implements OnInit, ICellRendererAngularComp {

  data: any
  params: any;
  formValue: FormGroup
  closeResult: string;


  /*@Input() someTemplate: TemplateRef<ElementRef>;
  context = {
    openModel(update: TemplateRef<any>) {
       this.modalRef = this.modalService.show(update, Object.assign({}, {class: 'gray modal-lg'}));
    }
  };*/
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private home: HomeComponent) {
  }


  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      serialNumber: [''],
      manufacturer: [''],
      typeGage: [''],
      installationDate: [''],
    })
  }

  agInit(params: ICellRendererParams): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }


  openModel(update: TemplateRef<any>) {
      this.modalService.open(update, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  updateGage() {
    console.log("1111"+ JSON.stringify(this.data.data))
  }

  deleteGage() {
    //this.http.put<any>('http://localhost:8005/api/', this.param.data).subscribe(
    //response => { this.home.load(); this.modalService.close();}
    //добавить toast
    //this.modal.hide();
    // )


  }
}
