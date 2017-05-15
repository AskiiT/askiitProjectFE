import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

declare var firebase: any;

@Component({
  selector: 'app-postulated',
  templateUrl: './postulated.component.html',
  styleUrls: ['./postulated.component.css']
})

export class PostulatedComponent implements OnInit {

    p_users: Array<any> = [];
    question_id: number;
    question_title: string;
    chats = [];
    currentChats = [];
    userData;

    userChatPath: string;
    chatRequestPath: string = '/chatRequests';
    liveChatsPath: string  = '/liveChats';

    constructor( public dialogRef: MdDialogRef<PostulatedComponent>, private ngRedux: NgRedux<IAppState> ) {
        ngRedux.select( 'authUserData' ).subscribe(
            res => {
                this.userData = res,
                this.userChatPath = '/' + this.userData.id + '/myChatRequests';
            }
        )
    }

    ngOnInit( ) {
        this.fbGetData( );
    }

    fbGetData( )
    {
        firebase.database( ).ref( this.userChatPath ).on( 'child_added', ( snapshot ) => {
            this.chats.push( snapshot.val( ) )
        });

        firebase.database( ).ref( this.liveChatsPath ).on( 'child_added', ( snapshot ) => {
            if ( snapshot.val( ).adviser_id == this.userData.id || snapshot.val( ).asker_id == this.userData.id )
                this.currentChats.push( snapshot.val( ) )
        })
    }

    emptyUsers( ) {
        return this.p_users.length == 0;
    }

    requestChat( index ) {
        for ( var i = 0; i < this.chats.length; i++ )
            if ( this.chats[ i ].id == this.p_users[ index ].id )
                return;

        for ( var i = 0; i < this.currentChats.length; i++ )
            if( this.currentChats[ i ].asker_id == this.p_users[ index ].id || this.currentChats[ i ].adviser_id == this.p_users[ index ].id )
                return;

        firebase.database( ).ref( this.userChatPath ).child( this.p_users[ index ].id ).set({
            id: this.p_users[ index ].id,
            username: this.p_users[ index ].username,
            first_name: this.p_users[ index ].first_name,
            last_name: this.p_users[ index ].last_name,
        })

        firebase.database( ).ref( this.chatRequestPath ).child( this.userData.id + '-' + this.p_users[ index ].id ).set({
            from_id: this.userData.id,
            from_username: this.userData.username,
            from_first_name: this.userData.first_name,
            to: this.p_users[ index ].id,
            question_id: this.question_id,
            question_title: this.question_title
        })
    }

}
