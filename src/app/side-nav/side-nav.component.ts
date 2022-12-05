import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

 @Input() sideNavStatus: boolean = false;
 @Output() selectedMenuEmit:any = new EventEmitter<string>();

 selectedMenu:string = "";
  isLoggedIn = false;

  list = [
    { number: '1', route: 'home', name: 'ГЛАВНАЯ', icon: 'fa-solid fa-house',},
    { number: '2', route: 'analytics',  name: 'ПРИБОРЫ', icon: 'fa-solid fa-chart-line', },
    {number: '3', route: 'setting', name: 'НАСТРОЙКИ', icon: 'fa-solid fa-gear', },
    { number: '4', route: 'about', name: 'СЧЕТА', icon: 'fa-solid fa-circle-info', },
  ];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  goTo(route: string) {
    this.selectedMenu = route
    this.selectedMenuEmit.emit(route);
  }
}
