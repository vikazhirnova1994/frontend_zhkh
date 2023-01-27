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
    {number: '2', route: 'user-gages', name: 'Мои Приборы', icon: 'fa-sharp fa-solid fa-gauge-simple', role: 'user'},
    {number: '3', route: 'user-gages-data', name: 'Мои Показания', icon: 'fa-solid fa-plug-circle-plus', role: 'user'},
    {number: '4', route: 'user-claims', name: 'Мои Заявки', icon: 'fa-solid fa-screwdriver-wrench', role: 'user'},
  ];
  adminList = [
    {number: '1', route: 'profile', name: 'Главная', icon: 'fa-solid fa-house', role: 'admin'},
    {number: '2', route: 'all-flat', name: 'Квартиры', icon: 'fa-solid fa-hotel', role: 'admin'},
    {number: '2', route: 'all-contract', name: 'Договоры', icon: 'fa-solid fa-file-contract', role: 'admin'},
    {number: '3', route: 'all-gage', name: 'Приборы', icon: 'fa-sharp fa-solid fa-gauge-simple', role: 'admin'},
    {number: '3', route: 'all-user', name: 'Пользователи', icon: 'fa-solid fa-user', role: 'admin'}
  ];
  dispatcherList = [
    {number: '1', route: 'profile', name: 'Главная', icon: 'fa-solid fa-house', role: 'dispatcher'},
    {number: '2', route: 'all-gage-data', name: 'Показания', icon: 'fa-sharp fa-solid fa-gauge-simple', role: 'dispatcher'},
    {number: '3', route: 'all-claims', name: 'Заявки', icon: 'fa-solid fa-screwdriver-wrench', role: 'dispatcher'},
  ];
  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.isLoggedIn = this.storageService.isLoggedIn();
      switch (this.storageService.getAuthorities()) {
        case '["ROLE_USER"]': {
          this.role = "user"; break;
        }
          case '["ROLE_ADMIN"]': {
          this.role = "admin"; break;
        }
        case '["ROLE_DISPATCHER"]': {
          this.role = "dispatcher"; break;
        }
        default: {
          this.role = ""; break;
        }
      }
      if (this.storageService.getAuthorities() === '["ROLE_USER"]') {
        this.role = "user"
      }
    }
  }

  goTo(route: string) {
    this.selectedMenu = route
    this.selectedMenuEmit.emit(route);
  }
}
