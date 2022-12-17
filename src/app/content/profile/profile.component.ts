import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  info: any;

  constructor( private storageService: StorageService) { }

  ngOnInit(): void {
    this.info = {
      token: this.storageService.getToken(),
      username: this.storageService.getUsername(),
      contractNumber: this.storageService.getContractNumber(),
      authorities:  this.storageService.getAuthorities()
    };
  }
}
