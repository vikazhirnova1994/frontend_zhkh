import {Component} from '@angular/core';
import {StorageService} from "./_services/storage.service";
import {AuthService} from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'navBarDarkMode';
  sideNavStatus: boolean = false;

  sideNavSelected: string = "";

  private roles: string[] = [];
  isLoggedIn = false;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }
}
