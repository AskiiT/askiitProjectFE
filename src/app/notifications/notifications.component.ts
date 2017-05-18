import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationService } from '../notification.service';

declare var firebase: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [ NotificationService ]
})
export class NotificationsComponent implements OnInit {

    array = [];

    constructor( public dialogRef: MdDialogRef<NotificationsComponent>, private nService: NotificationService ) {
        // nService.getNotifications( ).subscribe(
        //     res => { this.array = res.notifications },
        //     () => {},
        //     () => console.log( 'Ok: notifications received.')
        // )
    }

    ngOnInit() {
    }

    validateResponse( ) {
        return this.array instanceof Array;
    }

    markNotificationAsReaded( index ) {
        this.nService.markNotificationAsReaded( this.array[ index ].child ).subscribe(
            res => {
                firebase.database( ).ref( this.array[ index ].path ).child( this.array[ index ].child )
                    .child( 'read' )
                        .set( 1 )
            },
            () => {},
            () => console.log( "OK: Notification readed." )
        )
    }

}
