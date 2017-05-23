import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsComponent } from '../notifications/notifications.component';
import { style, state, animate, transition, trigger } from '@angular/core';
import { UserService } from '../user.service';

declare var firebase: any;

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
  providers: [ UserService ],
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
export class NavigatorComponent implements OnInit {

    userData;
    notifications = [];
    notReaded: number = 0;

    imageURL: string;
    color: string;

    alreadyListeningFirebase: boolean = false;

    constructor( public dialog: MdDialog, private ngRedux: NgRedux<IAppState>, private uService: UserService ) {
        ngRedux.select( 'authUserData' ).subscribe(
            res => {
                    this.userData = res;
                    this.fbGetData( );

                    if ( this.userData.id != undefined )
                        this.uService.getUserByUsername( this.userData.username ).subscribe(
                          res => {
                                  this.imageURL = "url('http://askiit.herokuapp.com" + res[ 0 ].avatar.avatars.avatars.url + "')",
                                  this.color = res[ 0 ].color
                              },
                          () => {},
                          () => console.log( "OK: profile pic path completed." )
                        );
            }
        )
    }

    ngOnInit( ) {
        this.fbGetData( );
    }

    fbGetData( ) {
        if ( this.userData.id != undefined && !this.alreadyListeningFirebase ) {
            this.alreadyListeningFirebase = true;

            firebase.database( ).ref( '/' + this.userData.id + '/notifications' ).on( 'child_added', ( snapshot ) => {

                var msgPath = "";
                for ( var i = 0; i < snapshot.V.path.o.length - 1; i++ )
                    msgPath += '/' + snapshot.V.path.o[ i ]

                this.notifications.push({
                    val: snapshot.val( ),
                    path: msgPath,
                    child: snapshot.V.path.o[ snapshot.V.path.o.length - 1 ],
                })

                if ( snapshot.val( ).read == 0 )
                    this.notReaded++;
            })

            firebase.database( ).ref( '/' + this.userData.id + '/notifications' ).on( 'child_changed', ( snapshot ) => {
                for ( var i = 0; i < this.notifications.length; i++ )
                    if ( this.notifications[ i ].val.notification_id == snapshot.val( ).notification_id ) {
                        this.notifications[ i ].val = snapshot.val( )
                        this.notReaded--;
                        break;
                    }
            })
        }
    }

    openNotifications() {
        let dialogRef = this.dialog.open( NotificationsComponent, {
            height: '385px',
            width: '300px'
        });

        dialogRef.componentInstance.array = this.notifications;
    }

}
