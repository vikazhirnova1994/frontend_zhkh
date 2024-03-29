import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {FormGroup, Validators} from "@angular/forms";
import {FormControlModel} from "../form-control/form.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      contractNumber: new FormControlModel({
        label: 'Номер контракта',
        placeholder: 'Номер контракта',
        name: "contractNumber",
        validation: {
          required: 'Введите номер контракта',
          pattern: 'Номер контракта состоит из 14 чисел'
        },
        icon: 'fa-solid fa-file-contract'
      }, '', [
        Validators.required,
        Validators.pattern("[0-9]{14}"),
      ]),
      username: new FormControlModel({
        label: 'Имя пользователя',
        placeholder: 'Имя пользователя',
        name: "username",
        validation: {
          required: 'Пожалуйста, введите логин',
        },
        icon: 'fas fa-user'
      }, '', [
        Validators.required
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
        Validators.pattern("\\d{8,}"),
      ])
    });
  }

  public getControl(): Array<FormControlModel> {
    return Object.values(this.form.controls) as Array<FormControlModel>;
  }

  onSubmit() {
    console.log(this.form.value)
    const {username, contractNumber, password} = this.form.value;
    this.authService.register(username, contractNumber, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
