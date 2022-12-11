import {Component,  OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {FormControl, FormGroup, Validators, FormBuilder, ValidationErrors} from "@angular/forms";
import {FormControlModel} from "../form.model";
import {publish} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
   registerModel: any = {  username: null,  contractNumber: null,  password: null  };
   isSuccessful = false;
   isSignUpFailed = false;
   errorMessage = '';

  public form: FormGroup;

  private formActive = true;


  constructor(private authService: AuthService) {
  }

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
        Validators.pattern("\\d{8}"),
      ])
    });
  }
  public getControl(): Array<FormControlModel> {
    return Object.values(this.form.controls) as Array<FormControlModel>;
  }
  onSubmit() {
    console.log(this.form.value)
    const { username, contractNumber, password } = this.form.value;
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
