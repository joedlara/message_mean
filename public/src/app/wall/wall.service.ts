import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';


@Injectable()
export class WallService {
 constructor(private _http:Http) { }

  createMessage(newMessage){
  	console.log("in service's newMessage function");
  	return this._http.post('/api/messages', newMessage)
  	.map((response)=>response.json())
  	.toPromise()
  }
  
  getMessages(){
  	console.log("in service's getCurrentMessages");
  	return this._http.get('/api/messages')
  	.map((response)=>response.json())
  	.toPromise()
  }

  getCurrentUser(){
  	console.log("in service's getCurrentUser");
  	return this._http.get('/api/current_user')
  	.map((response)=>response.json())
  	.toPromise()
  }
  createComment(newComment, messageId){
  	console.log("in wall service's createComment");
  	return this._http.post('/api/comments/'+ messageId, newComment)
  	.map((response)=>response.json())
  	.toPromise()
  }
  deleteMessage(messageId){
    console.log("in wall service's deleteMessage");
    return this._http.get('/api/delete/'+ messageId)
    .map((response)=>response.json())
    .toPromise()

  }

  likeMessage(messageId){
    console.log("in wall service's likeMessage");
    return this._http.get('/api/like/'+ messageId)
    .map((response)=>response.json())
    .toPromise()
  }

  showMessage(messageId){
    console.log("in wall service showMessage");
    return this._http.get('/api/show/'+ messageId)
    .map((response)=>response.json())
    .toPromise()
  }

} 










