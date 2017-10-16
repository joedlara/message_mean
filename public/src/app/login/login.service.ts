import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()

export class LoginService {
  constructor(private _http: Http) { }
  login(newUser){
  	console.log("in service's login function");
  	return this._http.post('/api/users', newUser)
  	.map((response)=>response.json())
  	.toPromise()
  }
 
 }

