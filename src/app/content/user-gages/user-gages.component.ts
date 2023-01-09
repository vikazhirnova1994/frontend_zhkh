import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StorageService} from "../../_services/storage.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserGagesModal} from "./user-gages.modal";
import {UserGagesDataModal} from "../user-gages-data/user-gages-data.modal";

@Component({
  selector: 'app-user-gages',
  templateUrl: './user-gages.component.html',
  styleUrls: ['./user-gages.component.css']
})
export class UserGagesComponent implements OnInit {

  userGageList: Array<UserGagesModal>;
  userGageDataList: Array<UserGagesDataModal>;
  userGageDataByIdList: Array<UserGagesDataModal>;

  rowData$: Observable<any[]>;
  isLoggedIn = false;

  constructor(private storageService: StorageService, private http: HttpClient) {
    this.userGageList = new Array<UserGagesModal>();
    this.userGageDataList = new Array<UserGagesDataModal>();
    this.userGageDataByIdList = new Array<UserGagesDataModal>();
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
    this.http.get<Array<UserGagesModal>>('http://localhost:8005/api/gage/user-gages').subscribe(
      (data: Array<UserGagesModal>) => {
       // console.log("!!!!!!!!!!!!!!!", data);
        this.userGageList = data;
      });
  }

  lastGageData(){
    this.http.get<Array<UserGagesDataModal>>('http://localhost:8005/api/gage-data/user/last').subscribe(
      (data: Array<UserGagesDataModal>) => {
       //console.log("!!!!!!!!!!!!!!!", data);
        this.userGageDataList = data
      });
  }

  loadLastData(id: string) {
   this.http.get<Array<UserGagesDataModal>>('http://localhost:8005/api/gage-data/user/'+id/*, {params: params}*/).subscribe(
      (data: Array<UserGagesDataModal>) => {
       // console.log("!!!!!!!!!!!!!!!", data);
        this.userGageDataByIdList = data
      });
  }
}
