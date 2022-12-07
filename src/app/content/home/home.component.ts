import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ColDef} from "ag-grid-community";
import {Observable} from "rxjs";
import {CellCustomComponent} from "./cell-custom/cell-custom.component";
import {FormBuilder, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'navBarDarkMode';
  isLoggedIn = false;
  rowData$ : Observable<any[]>;
  columnDefs:any;
  formValue: FormGroup
  defaultColDef: ColDef = { sortable:true, filter:true }

  constructor(private storageService: StorageService, private http: HttpClient,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){
     this.createTable();
     setTimeout(() => { this.onLoad()}, 300)
    }
    //создание формы для модального окна
    this.formValue = this.formBuilder.group({
      serialNumber: [''],
      manufacturer: [''],
      typeGage: [''],
      installationDate: [''],
    })
  }
  onLoad(){
    this.rowData$ = this.http.get<any[]>('http://localhost:8005/api/gage/');
    //проверить приходят ли данные
     /*this.http.get<any>('http://localhost:8005/api/gage/').subscribe(
        response => { console.log("!!!!!!!!!!!!!!!", response); this.rowData = response; } );*/
  }

  STYLE_TABLE = {
    'width':"200px"
  }

  createTable(){
    this.columnDefs = [
      {headerName: 'Серийный номер', field: 'serialNumber', cellStyle:this.STYLE_TABLE},
      {headerName: 'Производитель', field: 'manufacturer', cellStyle:this.STYLE_TABLE},
      {headerName: 'Тип датчика', maxWidth:600, field: 'typeGage', cellStyle:this.STYLE_TABLE},
      {headerName: 'Дата инсталяции', field: 'installationDate', cellStyle:this.STYLE_TABLE},
      {headerName: 'Операция', cellRenderer: CellCustomComponent , cellStyle:this.STYLE_TABLE},
    ];
  }
}
