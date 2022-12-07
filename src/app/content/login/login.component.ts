import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {StorageService} from "../../_services/storage.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = { username: null, password: null  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.storageService.getAuthorities();
      // this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    //TODO добавить LoginRequest c полями username, password
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        console.log('1111111111');
        console.log(data);
        console.log(data.token);
        console.log(data.username);
        console.log(data.roles);
        this.storageService.saveToken(data.token);
        this.storageService.saveUsername(data.username);
        //TODO сохранить роли
        // this.storageService.saveAuthorities(data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.storageService.getAuthorities();
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
    //TODO выбросить emit SuccessLogin, вместо window.location.reload() использовать навигацию на /home
   // setTimeout(() => { this.router.navigate(['/']);}, 500)
    //this.router.navigate(['/']);
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
