import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {timeout} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  public roles: string[] = [];
  public isLoggedIn = false;
  public username?: string;

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUsername();
      this.username = user;
    }
  }

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log("authService logout", res);
        this.storageService.clean();
        this.router.navigate(['/login']);
        // window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
