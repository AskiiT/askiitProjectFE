import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';
import { QuestionService } from '../question.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ReportComponent } from '../report/report.component';

export interface Question {
    id?: number;
    title?: string;
    body?: string;
    topic?: any;
    tags?: Array<any>;
    user?: any;
    p_users?: Array<any>;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
      trigger('slideIn', [
        state('*', style({ 'overflow-y': 'hidden' })),
        state('void', style({ 'overflow-y': 'hidden' })),
        transition('* => void', [
            style({ height: '*' }),
            animate(250, style({ height: 0}))
        ]),
        transition('void => *', [
            style({ height: '0' }),
            animate(250, style({ height: '*' }))
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

export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() onResize = new EventEmitter();


  expand: boolean = false;
  disableIKnowIt = false;
  postulated: boolean = false;

  userData: any;

  constructor(private questionService: QuestionService, private ngRedux: NgRedux<IAppState>, public dialog: MdDialog ) {
      ngRedux.select( 'authUserData' ).subscribe(
          value => {
              this.userData = value;
              if ( this.userData === undefined )
                console.log( 'There is not user data :(' )
            }
      )
  }

  ngOnInit(){
    this.validateIKnowIt();
  }

  onChange(e){
    this.expand = (this.expand == false ? this.expand = true : this.expand = false);
    this.onResize.emit(e)
  }

  OnIKnowIt(questionId){
    if(this.postulated == false){
      this.questionService.postulateToQuestion(questionId).subscribe(
        res => {this.question = res, this.postulated = true}
      );
    }else{
      this.questionService.unpostulateToQuestion(questionId).subscribe(
        res => {this.question = res, this.postulated = false}
      );
    }
  }

  validateIKnowIt(){
    // Valida si el usuario ya se postulo a esta pregunta
    if(this.question.p_users != null ){
      for(var i = 0; i < this.question.p_users.length; i++){
        if(this.question.p_users[i].id == this.userData.id){
          this.postulated = true;
          break;
        }
      }
    }
    // Valida si el usuario fue el que realizo esta pregunta
    if(this.question.user.id == this.userData.id){
      this.disableIKnowIt = true;
    }
  }

  deletePostulate(){
    // for(var i = 0; i < this.question.p_users.length){
    //
    // }
  }

  openReportDialog( id ) {
      let dialogRef = this.dialog.open(ReportComponent,{
        height: '285px',
        width: '500px'
      });
      dialogRef.componentInstance.questionId = id;
      dialogRef.afterClosed();
  }

}
