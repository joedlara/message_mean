import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  user: object = {name: ""}


  constructor(private _loginService: LoginService,
    private _router: Router) { }

  ngOnInit() {
  }
  
  login(){
    console.log("In component login function")
    this._loginService.login(this.user)
      .then( (data) =>{
        console.log(data);
        this._router.navigate(['wall'])
      }) 
      .catch( (data) => console.log(data))

  }
  
}











