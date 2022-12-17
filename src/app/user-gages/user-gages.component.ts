import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StorageService} from "../_services/storage.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserGagesModal} from "./user-gages.modal";
import {UserGagesDataModal} from "./user-gages-data.modal";

@Component({
  selector: 'app-user-gages',
  templateUrl: './user-gages.component.html',
  styleUrls: ['./user-gages.component.css']
})
export class UserGagesComponent implements OnInit {

  userGageList: Array<UserGagesModal>;

  userGageDataList: Array<UserGagesDataModal>;

  rowData$: Observable<any[]>;
  isLoggedIn = false;

  constructor(private storageService: StorageService, private http: HttpClient) {
    this.userGageList = new Array<UserGagesModal>();
    this.userGageDataList = new Array<UserGagesDataModal>();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){
      setTimeout(() => {
        this.onLoad();  }, 300);
      setTimeout(() => {
        this.lastGageData();  }, 300);
    }
  }

  onLoad() {
    // this.rowData$ = this.http.get<any[]>('http://localhost:8005/api/gage/user-gages');
    //проверить приходят ли данные
    this.http.get<Array<UserGagesModal>>('http://localhost:8005/api/gage/user-gages').subscribe(
      (data: Array<UserGagesModal>) => {
        console.log("!!!!!!!!!!!!!!!", data);
       // this.rowData$ = response;
        this.userGageList = data;
      });
  }

  lastGageData(){
    this.http.get<Array<UserGagesDataModal>>('http://localhost:8005/api/gage-data/user/last').subscribe(
      (data: Array<UserGagesDataModal>) => {
        console.log("!!!!!!!!!!!!!!!", data);
        this.userGageDataList = data
      });
  }

  loadLastData(id: string) {
    let params = new HttpParams();
    params = params.append('gageId', id);

  /*  this.http.get<UserGagesDataModal>('http://localhost:8005/api/gage-data/user/', {params: params}).subscribe(
      (data: UserGagesDataModal) => {
        console.log("!!!!!!!!!!!!!!!", data);
        // this.rowData$ = response;
      //  this.userGageList = data;
        this.userGageData = data
      });*/
  }
}