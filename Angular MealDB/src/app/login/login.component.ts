import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  issignin=true
  issignup=false

  nameERR=""
  emailERR=""
  passwordERR=""
  invalidCred=""
  userRole:any
  submitForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    name: new FormControl()
  })
  constructor(private http:HttpClient,private router:Router)
  {

  }
  ngOnInit(): void {

    const x= document.getElementById('signin')?.style
    if(x) x.borderBottom = "3px solid #1DB954".toString()

    if(localStorage.getItem("key") != "no-access" && localStorage.getItem("key") != "no-access-login-required")
        {
          this.router.navigateByUrl('/home');
        }
  }
  signin()
  {
    this.issignin=true;
    this.issignup=false;
    const y= document.getElementById('signup')?.style
    if(y) y.borderBottom = "".toString()
    const x= document.getElementById('signin')?.style
    if(x) x.borderBottom = "3px solid #1DB954".toString()

  }
  signup():void{
    this.issignin=false;
    this.issignup=true;
    const y= document.getElementById('signin')?.style
    if(y) y.borderBottom = "".toString()
    const x= document.getElementById('signup')?.style
    if(x) x.borderBottom = "3px solid #1DB954".toString()

  }
  emptyERR(){
    this.nameERR=""
    this.emailERR=""
    this.passwordERR=""
    this.invalidCred=""
  }
  Authentication(operation : string)
  {
    this.emailERR=""
    this.passwordERR=""
    this.invalidCred=""
    var format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.submitForm.value.email || !this.submitForm.value.email.match(format)) 
    {
      this.emailERR="Invalid email"
    } 

    if(!this.submitForm.value.password || this.submitForm.value.password.length < 5)
    {
      this.passwordERR="Password length must be atleast 5"
    }
    if(!this.submitForm.value.name)
    {
      this.nameERR="Name shouls not be empty"
    }
    if(this.emailERR  === "" && this.passwordERR === "")
    {
      var URL = ""
      if(operation === "Login")
      {
        URL = "http://localhost:3000/login"
      }
      else{
        URL = "http://localhost:3000/signup"
      }
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
      this.http.post <any> (URL, JSON.stringify({name:  this.submitForm.value.name,email: this.submitForm.value.email, password:this.submitForm.value.password}), {
        headers: headers
      })
      .subscribe(data => {
        console.log(data)
        localStorage.setItem("key",data.key)
        if(localStorage.getItem("key") === "no-access")
        {
          this.invalidCred="Invalid email or password"
          return
        }
        if(localStorage.getItem("key") === "no-access-login-required")
        {
          this.invalidCred="Already signed up, Please signin"
          return
        }
        if(localStorage.getItem("key") != "no-access" && localStorage.getItem("key") != "no-access-login-required")
        {
          this.router.navigateByUrl('/home');
        }
      });
    }

  }
}
