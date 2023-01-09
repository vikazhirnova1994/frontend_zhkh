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
    {number: '2', route: 'user-gages', name: 'Приборы', icon: 'fa-solid fa-gauge-high', role: 'user'},
    {number: '3', route: 'user-gages-data', name: 'Показания', icon: 'fas fa-pen', role: 'user'},
    {number: '4', route: 'user-claims', name: 'Заявки', icon: 'fa fa-credit-card', role: 'user'},
  ];

  adminList = [
    {number: '1', route: 'profile', name: 'Главная', icon: 'fa-solid fa-house', role: 'admin'},
    {number: '2', route: 'all-user', name: 'Пользователи', icon: 'fa fa-user-o', role: 'admin'},
    {number: '3', route: 'all-flat', name: 'Квартиры', icon: 'fa-solid fa-house', role: 'admin'},
    {number: '4', route: 'all-contract', name: 'Договоры', icon: 'fa-solid fa-chart-line', role: 'admin'},
    {number: '5', route: 'all-gage', name: 'Приборы', icon: 'fa-solid fa-gear', role: 'admin'},
  ];

/*  moderatorList = [
    {number: '1', route: 'profile', name: 'Главная', icon: 'fa-solid fa-house', role: 'moderator'},
    {number: '2', route: 'all-flat', name: 'Квартиры', icon: 'fa-solid fa-house', role: 'moderator'},
    {number: '3', route: 'all-contract', name: 'Договоры', icon: 'fa-solid fa-chart-line', role: 'moderator'},
    {number: '3', route: 'all-gage', name: 'Приборы', icon: 'fa-solid fa-gear', role: 'moderator'},
  ];*/

  dispatcherList = [
    {number: '1', route: 'all_indication', name: 'Показания', icon: 'fa-solid fa-house', role: 'dispatcher'},
    {number: '2', route: 'debtors', name: 'Должники', icon: 'fa-solid fa-chart-line', role: 'dispatcher'},
    {number: '3', route: 'claims', name: 'Заявки', icon: 'fa-solid fa-gear', role: 'dispatcher'},
  ];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.isLoggedIn = this.storageService.isLoggedIn();
      //this.role = this.storageService.getAuthorities();
      switch (this.storageService.getAuthorities()) {
        case '["USER"]': {
          this.role = "user"; break;
        }
          case '["ADMIN"]': {
          this.role = "admin"; break;
        }
      /*  case '["MODERATOR"]': {
          this.role = "moderator"; break;
        }*/
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
