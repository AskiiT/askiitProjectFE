import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { style, state, animate, transition, trigger } from '@angular/core';
import { MdAutocompleteModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NgZone } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ChatWindowComponent } from '../chat-window/chat-window.component';

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
    ]),
    trigger('fadeInOut', [
        transition(':enter', [
          style({opacity:0}),
          animate(250, style({opacity:1}))
        ]),
        transition(':leave', [
          animate(250, style({opacity:0}))
        ])
    ])
  ]
})

export class ChatsComponent implements OnInit {

    allUsers: any;
	response$;
    gotResponse: boolean = true;

    term: string = '';
    catchedTerm: string = '';
    _timeout: any = null;

    constructor( private uService: UserService, public lc: NgZone, public dialog: MdDialog ) { }

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

    inputChange( term ) {

        this.allUsers = null;

        if( this._timeout != null ) {
            window.clearTimeout( this._timeout );
        }

        this._timeout = window.setTimeout( () => {
            this._timeout = null;
            this.lc.run( () => this.catchedTerm = this.term );
            if ( this.catchedTerm.search( ' ' ) == -1 && this.catchedTerm != '' )
            {
                this.gotResponse = false;
                this.subscribeData( this.catchedTerm );
            }
        }, 600 );
    }

    openChat( ) {
        let dialogRef = this.dialog.open( ChatWindowComponent, {
          height: '530px',
          width: '600px'
        });
        dialogRef.afterClosed( );
    }

}
