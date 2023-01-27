import {Component} from '@angular/core';
import {StorageService} from "./_services/storage.service";
import {AuthService} from "./_services/auth.service";
import {EventBusService} from './_helpers/event-bus.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'navBarDarkMode';
  sideNavStatus: boolean = false;
  sideNavSelected: string = "";
  isLoggedIn = false;
  eventBusSub?: Subscription;

  role : string ="";

  constructor(private storageService: StorageService, private authService: AuthService,
              private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.role = this.storageService.getAuthorities();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
