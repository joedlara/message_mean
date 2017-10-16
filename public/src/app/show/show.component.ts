import { Component, OnInit } from '@angular/core';
import { ShowService } from './show.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

	show = "";
	// shows: object[] = []
	shows: object = {}

  constructor(private _showService: ShowService, private _router: ActivatedRoute) { 
  	this._router.params.subscribe((param)=>{
      console.log("ShowComponent loaded and url id given is: ", param.id);
      this.show = param.messageId;

    }) 
  }

  ngOnInit() {
  	this.current();
  }

  current(){
    console.log("in wall component newMessage");
    this._showService.showMessage({show: this.show})
    .then((data)=>{
      console.log("then");
      console.log(data);
      this.shows = data
      // this.getCurrentMessages();
    })
    .catch((data)=>console.log(data))
  }

}
