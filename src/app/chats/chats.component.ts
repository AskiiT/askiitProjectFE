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

    allUsers: any;
	response$;
    gotResponse: boolean = true;


    constructor( private uService: UserService ) { }

    ngOnInit( ) {

    }

    subscribeData( term ) {
    	this.response$ = this.uService.getUsersByMatch( term );

    	this.response$.subscribe(
    		res => { this.allUsers = res, this.gotResponse = true },
    		() => {},
    		() => console.log( "OK: users match completed!" )
    	);
    }

    checkForEmptyResponse( term ) {
        if ( term === '' )
            return false;
        if ( this.allUsers instanceof Array )
            return true;
        return false;
    }

    inputChange( term ){
        if ( term != '' ) {
            this.gotResponse = false;
            this.subscribeData( term );
        }
    }

}
