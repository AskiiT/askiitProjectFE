import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  providers: [ UserService ]
})
export class ChatsComponent implements OnInit {

	allUsers: Array<any>;
	response$;

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
    
}
