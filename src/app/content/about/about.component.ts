import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlatService} from "../../_services/flat.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  flatForm: FormGroup;
  flatModel: any;
  flatDetailsModel: any;

  showAddedBtn: boolean =true;
  showUpdateBtn: boolean = false;

  constructor(private api: FlatService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllFlat();
    this.createFlatForm();

  }
  createFlatForm(){
    this.flatForm = this.formBuilder.group(
      { id:[''],  city: [''],  street: [''],  houseNumber:[''],  entrance: [],  flatNumber:[], area: ['']  }
    );
  }

  postFlat(){
    this.flatModel = Object.assign({}, this.flatForm.value);
    this.api.postFlat(this.flatModel).subscribe(res=> {
      alert("Flat added successfully");
      let close = document.getElementById('close');
      close?.click();
      this.flatForm.reset();
      //this.getAllFlat();
    }, err => {
      alert("Error");
    })
  }

  getAllFlat(){
    this.api.getAllFlat().subscribe(res=> {
      this.flatDetailsModel = res;
      console.log(this.flatDetailsModel );
    }, err=>{
      console.log(err);
    })
  }
  deleteFlat(id:any){
    this.api.deleteFlat(id).subscribe(res=> {
      alert("Flat deleted successfully");
      this.flatDetailsModel = res;
      console.log(this.flatDetailsModel );
      this.getAllFlat();

    }, err=>{
      alert("Failed to delete");
      console.log(err);
    })
  }
/*
  edit(stduent:any){

    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.studentForm.controls['id'].setValue(stduent.id);
    this.studentForm.controls['name'].setValue(stduent.name);
    this.studentForm.controls['email'].setValue(stduent.email);
    this.studentForm.controls['phone'].setValue(stduent.phone);
    this.studentForm.controls['address'].setValue(stduent.address);
  }*/
  edit(item: any) {
    this.showAddedBtn =false;
    this.showUpdateBtn = true;
    this.flatForm.controls['id'].setValue(item.id)
    this.flatForm.controls['city'].setValue(item.city)
    this.flatForm.controls['street'].setValue(item.street)
    this.flatForm.controls['houseNumber'].setValue(item.houseNumber)
    this.flatForm.controls['entrance'].setValue(item.entrance)
    this.flatForm.controls['flatNumber'].setValue(item.flatNumber)
  }

  updateFlatDetails() {
    this.flatModel = Object.assign({}, this.flatForm.value);
    this.flatForm.reset(); //
    this.flatModel={};//
   /* this.api.updateStudent(this.flatModel, this.flatModel.id).subscribe(res=>{
      alert("Student information updated successfully");
      let close = document.getElementById('close');
      close?.click();
      this.getAllFlat();
      this.flatForm.reset();
      this.flatModel={};
    }, err=>{
      alert("Error in updating student information");
    })*/
  }
}
