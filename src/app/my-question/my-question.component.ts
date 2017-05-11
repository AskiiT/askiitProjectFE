import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';
import { QuestionService } from '../question.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ReportComponent } from '../report/report.component';
import { MdSnackBar } from '@angular/material';

export interface MyQuestion {
    id?: number;
    title?: string;
    body?: string;
    topic?: any;
    tags?: Array<any>;
    user?: any;
    p_users?: Array<any>;
    difficulty?: number;
}


@Component({
  selector: 'app-my-question',
  templateUrl: './my-question.component.html',
  styleUrls: ['./my-question.component.css'],
  providers: [QuestionService],
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
export class MyQuestionComponent implements OnInit {

  @Input() myQuestion: MyQuestion;
  @Input() scrollState: number;
  @Output() onResize = new EventEmitter();

  expand: boolean = false;
  disableIKnowIt = false;
  postulated: boolean = false;

  userData: any;

  constructor(private questionService: QuestionService, public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  onChange(e){
    this.expand = (this.expand == false ? this.expand = true : this.expand = false);
    if (this.scrollState == 2)
      this.onResize.emit(e)
  }

  onDelete(){
    this.questionService.deleteQuestion( this.myQuestion.id ).subscribe(
        res => console.log( "Question deleted." )
    )
    this.snackBar.open( 'Pregunta eliminada', 'Cerrar', {
        duration: 5000
    } )
  }
}
