import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

    constructor( public dialog: MdDialog ) { }

    ngOnInit() {
    }

    openNotifications() {
      let dialogRef = this.dialog.open(NotificationsComponent,{
        height: '385px',
        width: '300px'
      });
      dialogRef.afterClosed();
    }

}
