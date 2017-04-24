import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {style, state, animate, transition, trigger} from '@angular/core';
import {MdAutocompleteModule} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  providers: [ UserService ],
  animations: [
      trigger('slideIn', [
        state('*', style({})),
        state('void', style({})),
        transition('* => void', [
            style({ height: '*' }),
            animate(150, style({ height: 0}))
        ]),
        transition('void => *', [
            style({ height: '0' }),
            animate(150, style({ height: '*' }))
        ])
    ])
  ]
})

export class ChatsComponent implements OnInit {

  allUsers: Array<any>;
	response$;
  empty:boolean=false;
  term:string;
    constructor( private uService: UserService ) { }

    ngOnInit( ) {
    	this.subscribeData( );
    }

    subscribeData( ) {
    	this.response$ = this.uService.getAllUsers( );

    	this.response$.subscribe(
    		res => this.allUsers = res,
    		() => {},
    		() => console.log( "OK: completed!" )
    	);
    }

    isEmpty(){
      if (this.term.length > 0){
        this.empty = true;
      }else{
        this.empty = false;
      }
    }

}
