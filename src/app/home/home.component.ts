import {Component, OnInit} from '@angular/core';
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'navBarDarkMode';
  isLoggedIn = false;
  constructor(private storageService: StorageService) { }


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

}
