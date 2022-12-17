import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../_services/auth.service";
import {StorageService} from "../../../_services/storage.service";
import {Router} from '@angular/router';
import {FormGroup, Validators} from "@angular/forms";
import {FormControlModel} from "../../../form-control/form.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.isLoggedIn = true;
    }
      this.form = new FormGroup({
        username: new FormControlModel({
          label: 'Имя пользователя',
          placeholder: 'Имя пользователя',
          name: "username",
          validation: {
            required: 'Пожалуйста, введите логин',
          },
          icon: 'fas fa-user'
        }, '', [
          Validators.required,
        ]),
        password: new FormControlModel({
          label: 'Пароль',
          placeholder: 'Пароль',
          name: "password",
          validation: {
            required: 'Пожалуйста, введите пароль',
            pattern: 'Введите не менее 8 символов'
          },
          icon: 'fa-solid fa-key'
        }, '', [
          Validators.required,
          Validators.pattern("\\d{8}"),
        ])
      });
    }

  onSubmit(): void {
    //TODO добавить LoginRequest c полями username, password
    console.log(this.form.value)
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        console.log('1111111111');
        console.log(data);
        console.log(data.token);
        console.log(data.username);
        console.log(data.roles);
        this.storageService.saveToken(data.token);
        this.storageService.saveUsername(data.username);
        this.storageService.saveContractNumber(data.contractNumber);
        this.storageService.saveAuthorities(data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
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
  public getControl(): Array<FormControlModel> {
    return Object.values(this.form.controls) as Array<FormControlModel>;
  }
}
