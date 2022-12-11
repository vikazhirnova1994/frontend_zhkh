import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControlModel} from "../content/form/form.model";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit, OnDestroy {

  @Input() control: FormControlModel;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.control.unsubscribe();
  }
}
