import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

let authDetails = [
  {
    name : "Hemanth Rai",
    email : "admin@gmail.com",
    password : "admin",
    token : "dummyToken"
  }
]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl()
  })
  authError = {
    type : false,
    message : ""
  }
  constructor(private router: Router) { }

  signingIn (loaggedinAuth) {
    if(loaggedinAuth.email === authDetails[0].email && loaggedinAuth.password === authDetails[0].password){
      loaggedinAuth = authDetails[0]
      localStorage.setItem("AuthDetails",JSON.stringify(loaggedinAuth))
      this.authError.type = false;
      this.router.navigateByUrl('/admin/dashboard');
      return true;
    }else {
      this.authError = { type : true, message : "In Correct Password!"}
    }
  }
}
