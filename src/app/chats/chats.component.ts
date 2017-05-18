import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { style, state, animate, transition, trigger } from '@angular/core';
import { MdAutocompleteModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NgZone } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

declare var firebase: any;

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

    dialogRef;

    currentChats = [];
    toReadCurrentChats = [];

    requestChats = [];
    acceptChats = [];

    userChatPath: string;

    userData;
    alreadyListeningFirebase: boolean = false;

    chatRequestPath: string = '/chatRequests';

    dialogOpened = {
        opened: false,
        index: -1
    };

    constructor( private uService: UserService, public lc: NgZone, public dialog: MdDialog, private ngRedux: NgRedux<IAppState> ) {
        ngRedux.select( 'authUserData' ).subscribe(
            res => {
                    this.userData = res;
                    this.userChatPath = '/' + this.userData.id + '/myChatRequests';
                    this.fbGetData( );
            }
        )
    }

    ngOnInit( ) {
        this.fbGetData( )
    }

    fbGetData( )
    {
        if ( this.userData.username != undefined && !this.alreadyListeningFirebase ) {
            this.alreadyListeningFirebase = true;

            firebase.database( ).ref( this.userChatPath ).on( 'child_added', ( snapshot ) => {
                this.requestChats.push( snapshot.val( ) )
            });

            firebase.database( ).ref( this.userChatPath ).on( 'child_removed', ( snapshot ) => {
                var index = -1;
                for ( var i = 0; i < this.requestChats.length; i++ )
                    if ( this.requestChats[ i ].id == snapshot.val( ).id ) {
                        index = i;
                        break;
                    }
                if ( index != -1 ) {
                    this.requestChats = this.requestChats.slice( 0, index )
                        .concat( this.requestChats.slice( index + 1, this.requestChats.length ) )
                }
            });

            firebase.database( ).ref( this.chatRequestPath ).on( 'child_added', ( snapshot ) => {
                if ( snapshot.val( ).to == this.userData.id ) { //chat request is for me!
                    this.acceptChats.push({
                        username: snapshot.val( ).from_username,
                        user_id: snapshot.val( ).from_id,
                        name: snapshot.val( ).from_first_name,
                        question_id: snapshot.val( ).question_id,
                        question_title: snapshot.val( ).question_title
                    })
                }
            });

            firebase.database( ).ref( '/liveChats' ).on( 'child_added', ( snapshot ) => {
                if ( snapshot.val( ).adviser_id == this.userData.id ) {
                    var index = this.currentChats.length;

                    this.currentChats.push({
                        username: snapshot.val( ).asker_username,
                        path: snapshot.val( ).path,
                        question_title: snapshot.val( ).question_title,
                        unreadMsgs: 0,
                        msgs: []
                    })

                    this.toReadCurrentChats.push([])

                    firebase.database( ).ref( this.currentChats[ index ].path )
                        .on( 'child_added', ( snapshot ) => {

                            var msgPath = "";
                            for ( var i = 0; i < snapshot.V.path.o.length - 1; i++ )
                                msgPath += '/' + snapshot.V.path.o[ i ]

                            this.currentChats[ index ].msgs.push(
                                snapshot.val( )
                            );

                            if ( ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read && !this.dialogOpened.opened )
                                || ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read && this.dialogOpened.opened &&
                                    this.dialogOpened.index != index ) ) {

                                    this.currentChats[ index ].unreadMsgs++;

                                    this.toReadCurrentChats[ index ].push({
                                        msgPath: msgPath,
                                        child: String( snapshot.V.path.o[ snapshot.V.path.o.length - 1 ] )
                                    })
                                }
                            else if ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read && this.dialogOpened.opened ) {
                                firebase.database( ).ref( msgPath )
                                    .child( String( snapshot.V.path.o[ snapshot.V.path.o.length - 1 ] ) )
                                        .child( 'read' )
                                            .set( 'true' )
                            }
                        })

                } else if ( snapshot.val( ).asker_id == this.userData.id ) {
                    var index = this.currentChats.length;
                    this.currentChats.push({
                        username: snapshot.val( ).adviser_username,
                        path: snapshot.val( ).path,
                        question_title: snapshot.val( ).question_title,
                        unreadMsgs: 0,
                        msgs: []
                    })

                    this.toReadCurrentChats.push([])

                    firebase.database( ).ref( this.currentChats[ index ].path )
                        .on( 'child_added', ( snapshot ) => {

                            var msgPath = "";
                            for ( var i = 0; i < snapshot.V.path.o.length - 1; i++ )
                                msgPath += '/' + snapshot.V.path.o[ i ]

                            this.currentChats[ index ].msgs.push(
                                snapshot.val( )
                            );

                            if ( ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read && !this.dialogOpened.opened )
                                || ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read && this.dialogOpened.opened &&
                                    this.dialogOpened.index != index ) ) {

                                    this.currentChats[ index ].unreadMsgs++;

                                    this.toReadCurrentChats[ index ].push({
                                        msgPath: msgPath,
                                        child: String( snapshot.V.path.o[ snapshot.V.path.o.length - 1 ] )
                                    })
                                }
                            else if ( snapshot.val( ).id != this.userData.id && !snapshot.val( ).read && this.dialogOpened.opened ) {
                                firebase.database( ).ref( msgPath )
                                    .child( String( snapshot.V.path.o[ snapshot.V.path.o.length - 1 ] ) )
                                        .child( 'read' )
                                            .set( 'true' )
                            }
                        })
                }
            });
         }
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

    openChat( index ) {

        this.dialogOpened = {
            opened: true,
            index: index
        };

        for ( var i = 0; i < this.toReadCurrentChats[ index ].length; i++ ) {
            firebase.database( ).ref( this.toReadCurrentChats[ index ][ i ].msgPath )
                .child( this.toReadCurrentChats[ index ][ i ].child )
                    .child( 'read' )
                        .set( 'true' )
        }

        this.toReadCurrentChats[ index ] = []

        this.dialogRef = this.dialog.open( ChatWindowComponent, {
          height: '530px',
          width: '600px'
        });
        this.currentChats[ index ].unreadMsgs = 0;

        this.dialogRef.componentInstance.messages = this.currentChats[ index ];
        this.dialogRef.componentInstance.messagesPath = this.currentChats[ index ].path;
        this.dialogRef.afterClosed( ).subscribe(
            result => {
                this.dialogOpened = {
                    opened: false,
                    index: -1
                };
            }

        );
    }

    checkIfDialogOpen( ) {
        if ( this.dialogRef != undefined )
            console.log( this.dialogRef.isOpen( ) )
    }

    acceptChatRequest( index ) {
        firebase.database( ).ref( this.chatRequestPath ).child( this.acceptChats[ index ].user_id + '-' + this.userData.id ).remove( );

        firebase.database( ).ref( '/liveChats' ).child( this.acceptChats[ index ].user_id + '-' + this.userData.id ).set({
            asker_id: this.acceptChats[ index ].user_id,
            adviser_id: this.userData.id,
            asker_username: this.acceptChats[ index ].username,
            adviser_username: this.userData.username,
            path: '/liveChats/' + this.acceptChats[ index ].user_id + '-' + this.userData.id + '/messages',
            question_id: this.acceptChats[ index ].question_id,
            question_title: this.acceptChats[ index ].question_title
        });

        firebase.database( ).ref( this.acceptChats[ index ].user_id + '/myChatRequests' )
            .child( this.userData.id ).remove( );

        this.acceptChats = this.acceptChats.slice( 0, index )
            .concat( this.acceptChats.slice( index + 1, this.acceptChats.length ) );
    }

}
