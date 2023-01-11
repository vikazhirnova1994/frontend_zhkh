import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;
  @Output() selectedMenuEmit: any = new EventEmitter<string>();

  selectedMenu: string = "";
  isLoggedIn = false;
  role: any;

  userList = [
    {number: '1', route: 'profile', name: 'Главная', icon: 'fa-solid fa-house', role: 'user'},
    {number: '2', route: 'user-gages', name: 'Мои Приборы', icon: 'fa-solid fa-gauge-high', role: 'user'},
    {number: '3', route: 'user-gages-data', name: 'Мои Показания', icon: 'fas fa-pen', role: 'user'},
  ];

  adminList = [
    {number: '1', route: 'profile', name: 'Главная', icon: 'fa-solid fa-house', role: 'admin'},
    {number: '3', route: 'all-flat', name: 'Квартиры', icon: 'fa-solid fa-house', role: 'admin'},
    {number: '5', route: 'all-gage', name: 'Приборы', icon: 'fa-solid fa-gear', role: 'admin'},
  ];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.isLoggedIn = this.storageService.isLoggedIn();
      switch (this.storageService.getAuthorities()) {
        case '["USER"]': {
          this.role = "user"; break;
        }
          case '["ADMIN"]': {
          this.role = "admin"; break;
        }
        case '["DISPATCHER"]': {
          this.role = "dispatcher"; break;
        }
        default: {
          this.role = ""; break;
        }
      }

      if (this.storageService.getAuthorities() === '["USER"]') {
        this.role = "user"
      }
    }
  }

  goTo(route: string) {
    this.selectedMenu = route
    this.selectedMenuEmit.emit(route);
  }
}
