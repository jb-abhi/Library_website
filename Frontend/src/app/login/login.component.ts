import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
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
  signupFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authsignError = false;
  signupsuccess = false;
  compareValue = true;
  authMessage = 'Email or password is incorrect, Please try again';
  authsignMessage = 'Email or password is incorrect';

  @ViewChild('login') login: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
    this._initSignupForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private _initSignupForm() {
    this.signupFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkbox: [false, Validators.requiredTrue],
      password: ['', Validators.required],
    });
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  get signupForm() {
    return this.signupFormGroup.controls;
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
        this.router.navigate(['/']);
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

  onSignup() {
    console.log('Submitted');

    if (this.signupFormGroup.invalid) return;

    this.isSubmitted = true;

    const signupData = {
      name: this.signupForm.name.value,
      email: this.signupForm.email.value,
      password: this.signupForm.password.value,
    };

    this.auth
      .signup(signupData.name, signupData.email, signupData.password)
      .subscribe(
        (user) => {
          console.log(user);
          this.authsignError = false;
          this.signupFormGroup.reset();
          this.signupsuccess = true;
          timer(2000)
            .toPromise()
            .then(() => {
              this.login.nativeElement.click();
            });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.authsignError = true;

          if (error.status === 400) {
            this.authsignMessage =
              'Error in the server, Please try again later';
          } else if (error.status === 500) {
            this.authsignMessage =
              'This mail id is already registered. Log in instead';
          } else {
            this.authsignMessage = 'Unexpected error occured, Please try again';
          }
        }
      );
  }
}
