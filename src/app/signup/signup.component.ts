import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SignupRequestPayload} from "../auth/signup/signup-request.payload";
import {AuthService} from "../auth/shared/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm : FormGroup ;

 /* constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }*/

  constructor(private authService: AuthService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),

    })

  /*  this.signupForm = this.formBuilder.group({
        fullname: [''],
        email: [''],
        password: [''],
        mobile: ['']
      }
    )*/
  }

 /* signUp() {
    this.http.post<any>("htttp://localhost:8081/signUsers", this.signupForm.value)
      .subscribe(res=> {
        alert("Signup successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert("Something went wrong!!");
      })
  }*/
  signUp() {
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

   this.authService.signup(this.signupRequestPayload)
     .subscribe(data=>{
       console.log(data);
     });
  }

}
