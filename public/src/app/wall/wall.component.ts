
import { Component, OnInit } from '@angular/core';
import { WallService } from './wall.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  message: object = {content: ""};
  
  messages: object[] = [];

  currentUser: object = {name: ""};
  
  comment: object = {content:""};

  errors: string[] = [];


  constructor(private _wallService: WallService, private _router: Router) { 
    this._wallService.getCurrentUser()
    .then((data)=>{
      console.log("then");
      this.currentUser = data;
    })
    .catch((error)=>{
      if (error.status == 401){
        this._router.navigate(['/login'])
        
      }
    })
  }

  ngOnInit() {
    this.getCurrentMessages();

  }

  getCurrentMessages(){
    this._wallService.getMessages()
    .then((data)=>{
    console.log("in wall component getCurrentMessages");
      console.log("then");
      this.messages = data;
      console.log(data);
      this.message = {content: ""};
    })
    .catch((data)=>console.log(data))
  }

  newMessage(){
    console.log("in wall component newMessage");
    this._wallService.createMessage(this.message)
    .then((data)=>{
      console.log("then");
      console.log(data);
      if(data.errors){
        console.log("There were validation errors")
        var errArr = [];
        for(var key in data.errors){
          errArr.push(data.errors[key].message);
        }
        this.errors = errArr;
      }else{
        this.getCurrentMessages(); 
      }

    })
    .catch((data)=>console.log(data))
  }

  newComment(messageId, i){
    console.log("in wall component newComment");
    console.log(this.comment);
    this._wallService.createComment({content:this.comment[i]}, messageId)
    .then((data)=>{
      console.log("then");
      console.log(data);
      this.getCurrentMessages();
      this.comment={}
    })
    .catch((data)=>console.log(data))
  }

  delete(messageId){
    console.log(messageId);
    this._wallService.deleteMessage(messageId)
    .then((data) => {
      console.log("In wall component delete");
      this.getCurrentMessages();
    })
    .catch((data)=> console.log(data))

  }

  likes(messageId){
    console.log(messageId);
    this._wallService.likeMessage(messageId)
    .then((data) =>{
      console.log("In wall component likes");
      this.getCurrentMessages();
    })
    .catch((data)=> console.log(data))

  }

  show(messageId){
    console.log("In wall component show function")
    this._wallService.showMessage(messageId)
      .then( (data) =>{
        console.log(data);
        this._router.navigate(['show/'+ messageId])
      }) 
      .catch( (data) => console.log(data))
  }

}









