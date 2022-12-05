import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SignupRequestPayload} from "../auth/signup/signup-request.payload";
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 // signupRequestPayload: SignupRequestPayload;
 // signupForm : FormGroup ;

 /* constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }*/

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {
/*  this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };*/
  }
  ngOnInit(): void {
  /* this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })*/
  }
  onSubmit(): void {
   /* this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;*/

    const { username, email, password } = this.form;

    this.authService.register(username, email, password ).subscribe({
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
