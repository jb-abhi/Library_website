import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupVal: boolean = true;

  @ViewChild('signupform') signupform: NgForm;
  @ViewChild('loginform') loginform: NgForm;

  constructor() {}
  ngOnInit(): void {}

  Onclicklogin() {
    this.signupVal = false;
  }
  Onclicksignup() {
    this.signupVal = true;
  }
  OnSubmit() {
    console.log(this.signupform);
  }
  OnSubmitLogin() {
    console.log(this.loginform);
  }
}
