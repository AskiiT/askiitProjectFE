import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ReportService } from '../report.service';

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
            res => { console.log( res ), this.dialogRef.close( ) },
            () => {},
            () => console.log( 'Ok: Report posted' )
        );
    }

}
