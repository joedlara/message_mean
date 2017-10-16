import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';


@Injectable()
export class ShowService {

  constructor(private _http: Http) { }

  showMessage(currentMessage){
  	console.log("in service's showMessage");
  	return this._http.post('/api/currentMessage', currentMessage)
  	.map((response)=>response.json())
  	.toPromise()
  }


}
