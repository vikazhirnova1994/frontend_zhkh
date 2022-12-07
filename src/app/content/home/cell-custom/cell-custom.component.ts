import {Component, ElementRef, Input, OnInit, TemplateRef} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.css']
})
export class CellCustomComponent implements OnInit, ICellRendererAngularComp {

  value: any
  formValue: FormGroup

  /*@Input() someTemplate: TemplateRef<ElementRef>;
  context = {
    openModel(update: TemplateRef<any>) {
       this.modalRef = this.modalService.show(update, Object.assign({}, {class: 'gray modal-lg'}));
    }
  };*/
 constructor( private formBuilder: FormBuilder ) {   }



  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      serialNumber: [''],
      manufacturer: [''],
      typeGage: [''],
      installationDate: [''],
    })
  }

  agInit(params: ICellRendererParams): void {
    this.value = params.value
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }


}
