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
    {number: '1', route: 'home', name: 'Главная', icon: 'fa-solid fa-house', role: 'user'},
    {number: '2', route: 'user_gages', name: 'Приборы', icon: 'fa-solid fa-gauge-high', role: 'user'},
    {number: '3', route: 'user_indication', name: 'Показания', icon: 'fas fa-pen', role: 'user'},
    {number: '4', route: 'user_account', name: 'Счета', icon: 'fa fa-credit-card', role: 'user'},
  ];

  adminList = [
    {number: '1', route: 'admin_home', name: 'Главная', icon: 'fa-solid fa-house', role: 'admin'},
    {number: '1', route: 'all_user', name: 'Пользователи', icon: 'fa fa-user-o', role: 'admin'},
    {number: '2', route: 'all_role', name: 'Роли', icon: 'fa fa-universal-access', role: 'admin'},
  ];

  moderatorList = [
    {number: '1', route: 'all_flat', name: 'Квартиры', icon: 'fa-solid fa-house', role: 'moderator'},
    {number: '2', route: 'all_contract', name: 'Договоры', icon: 'fa-solid fa-chart-line', role: 'moderator'},
    {number: '3', route: 'all_gage', name: 'Приборы', icon: 'fa-solid fa-gear', role: 'moderator'},
  ];

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
        case '["MODERATOR"]': {
          this.role = "moderator"; break;
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
