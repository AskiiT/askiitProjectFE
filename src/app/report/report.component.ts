import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ReportService } from '../report.service';

declare var firebase: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ ReportService ]
})
export class ReportComponent implements OnInit {

    questionId: number;

    constructor( public dialogRef: MdDialogRef<ReportComponent>, private rService: ReportService ) { }

    ngOnInit() {
    }

    closeReportDialog( ) {
        this.dialogRef.close( );
    }

    postReport( reason ) {
        this.rService.postReport( this.questionId, reason ).subscribe(
            res => {
                var data = res.notifications[ 0 ];
                if ( res.notifications != undefined || res.notifications != null ) {
                    firebase.database( ).ref( '/' + data.user_id + '/notifications' ).child( data.id ).set({
                        question_id: data.question_id,
                        body: data.body,
                        read: data.read,
                        notification_id: data.id                        
                    })
                }
                this.dialogRef.close( )
            },
            () => {},
            () => console.log( 'Ok: Report posted' )
        );
    }

}
