import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupVal: boolean = false;
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password is incorrect';

  @ViewChild('signupform') signupform: NgForm;
  // @ViewChild('loginform') loginform: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  // Onclicklogin() {
  //   this.signupVal = false;
  // }
  Onclicksignup() {
    this.signupVal = true;
  }
  onClickSubmit() {
    this.signupVal = false;
  }
  // OnSubmitSignup() {
  //   console.log(this.signupform);
  // }

  onLogin() {
    console.log('Submitted');

    if (this.loginFormGroup.invalid) return;

    this.isSubmitted = true;

    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value,
    };
    this.auth.login(loginData.email, loginData.password).subscribe(
      (user) => {
        console.log(user);
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/booklist']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, Please try again later';
        }
      }
    );
  }
}
