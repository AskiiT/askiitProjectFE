import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [ NotificationService ]
})
export class NotificationsComponent implements OnInit {

    array: any;

    constructor( public dialogRef: MdDialogRef<NotificationsComponent>, private nService: NotificationService ) {
        nService.getNotifications( ).subscribe(
            res => { this.array = res.notifications, console.log( res ) },
            () => {},
            () => console.log( 'Ok: notifications received.')
        )
    }

    ngOnInit() {
    }

    validateResponse( ) {
        return this.array instanceof Array;
    }

}
