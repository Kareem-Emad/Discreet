import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Input, Output, EventEmitter } from '@angular/core';
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authToken: Angular2TokenService) { }
  hide =true;
  email = "";
  password = "";
  s_email="";
  s_password ="";
  name="";
  ngOnInit() {
    
    this.authToken.validateToken()
    .subscribe(
      res =>      {
        console.log(res)
        this.router.navigate(['home']);
      },
      error => {
        console.log("not authenticated , need to log in")
      }  
    )
  
  }
  dosomething(){
    console.log(this.email)
    console.log(this.password)
    this.authToken.signIn({
        email: this.email,
        password: this.password
    }).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['home']);
        } ,
        error => {
             console.log(error)
        }
    );
    
  }

  signUp(){
    console.log(this.s_email)
    console.log(this.s_password)
    console.log(this.name)
    this.authToken.registerAccount({
      email:   this.s_email,
      password:    this.s_password,
      passwordConfirmation: this.s_password,
      name: this.name
  }).subscribe(
      res =>  {
        console.log(res)
      },
      error => {   
        console.log(error)
      }
  );



  }

}
