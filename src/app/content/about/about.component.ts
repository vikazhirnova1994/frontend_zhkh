import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  flatForm: FormGroup;
  flatModel: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  createFlatForm(){
    this.flatForm = this.formBuilder.group(
      {
        city: [''],
        street: [''],
        houseNumber:[''],
        entrance: [],
        flatNumber:[],
        area: ['']
      }
    );
  }

}
