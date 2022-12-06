import {Component, OnInit} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ColDef} from "ag-grid-community";
import {Observable} from "rxjs";
import {CellCustomComponent} from "../cell-custom/cell-custom.component";



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

  constructor(private storageService: StorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){

     this.createTable();
     setTimeout(() => { this.onLoad()}, 3000)

    }
  }

  onLoad(){
    this.rowData$ = this.http.get<any[]>('http://localhost:8005/api/gage/');
     /*this.http.get<any>('http://localhost:8005/api/gage/').subscribe(
        response => {
          console.log("!!!!!!!!!!!!!!!", response)
        //  this.rowData = response;
        }
      );*/

  }

  createTable(){
    this.columnDefs = [
      {headerName: 'Серийный номер', field: 'serialNumber',},
      {headerName: 'Производитель', field: 'manufacturer'},
      {headerName: 'Тип датчика', field: 'typeGage'},
      {headerName: 'Дата инсталяции', field: 'installationDate' },
      {headerName: 'Операция', cellRenderer: CellCustomComponent },
    ];
  }
  defaultColDef: ColDef = {
    sortable:true, filter:true
  }
}
