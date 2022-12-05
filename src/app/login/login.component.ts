import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../_services/auth.service";
import {StorageService} from "../_services/storage.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        //  this.reloadPage();
        this.router.navigate(['/']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  /*  login() {
      this.http.get<any>("http://localhost:8081/login")
        .subscribe(res=> {
          const user = res.find((a:any)=> {
            return a.email ===this.loginForm.value.email && a.password === this.loginForm.value.password
          });
          if (user) {
            alert("Login success")
            this.loginForm.reset();
            this.router.navigate(['home'])
          } else {
            alert("user not found")
          }
        }, err=> {
          alert("Something went wrong!!");
        });
    }*/
}
