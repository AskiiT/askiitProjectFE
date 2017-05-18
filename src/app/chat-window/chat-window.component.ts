import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { style, state, animate, transition, trigger } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

declare var firebase: any;

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  animations: [
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
export class ChatWindowComponent implements OnInit, AfterViewChecked {

    @ViewChild('chatContainer') private myScrollContainer: ElementRef;

    messages;

    userData;
    messagesPath: string = '/';

    constructor( public dialogRef: MdDialogRef<ChatWindowComponent>, private ngRedux: NgRedux<IAppState> ) {
        ngRedux.select( 'authUserData' ).subscribe(
            res => {
                this.userData = res
            }
        )
    }

    ngOnInit( ) {
        this.scrollToBottom( );
    }

    ngAfterViewChecked( ) {
        this.scrollToBottom( );
    }

    scrollToBottom( ): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch( err ) { }
    }

    fbGetData( )
    {
        firebase.database( ).ref( this.messagesPath ).on( 'child_added', ( snapshot ) => {
            if ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read ) {
                //firebase.database( ).ref(  )
                var msgPath = "";
                for ( var i = 0; i < snapshot.V.path.o.length - 1; i++ )
                    msgPath += '/' + snapshot.V.path.o[ i ]

                firebase.database( ).ref( msgPath )
                    .child( String( snapshot.V.path.o[ snapshot.V.path.o.length - 1 ] ) )
                        .child( 'read' )
                            .set( 'true' )
            }
            this.messages.push( snapshot.val( ) )
        });
    }

    sendMessage( msg ) {
        if ( msg != '' ) {
            console.log( this.messagesPath )
            firebase.database( ).ref( this.messagesPath ).push({
                id: this.userData.id,
                name: this.userData.first_name,
                msg: msg,
                read: false
            });
        }
    }

}
