import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/core';
import { QuestionService } from '../question.service';

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
    ])]
})

export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() onResize = new EventEmitter();


  expand: boolean = false;
  disableIKnowIt = false;
  userId = '3';

  constructor(private questionService: QuestionService){ }



  ngOnInit(){
    this.validateIKnowIt();
  }

  onChange(e){
    console.log(this.question);
    this.expand = (this.expand == false ? this.expand = true : this.expand = false);
    this.onResize.emit(e)
  }

  OnIKnowIt(questionId){
    this.questionService.postulateToQuestion(questionId, this.userId).subscribe(
      res => {this.question.p_users[this.question.p_users.length] = JSON.stringify({"id": this.userId}), console.log(this.question), this.disableIKnowIt = true}
    );
  }

  validateIKnowIt(){
    // Valida si el usuario ya se postulo a esta pregunta
    if(this.question.p_users != null ){
      for(var i = 0; i < this.question.p_users.length; i++){
        if(this.question.p_users[i].id == this.userId){
          this.disableIKnowIt = true;
          break;
        }
      }
    }
    // Valida si el usuario fue el que realizo esta pregunta
    if(this.question.user.id == this.userId){
      console.log("entro");
      this.disableIKnowIt = true;
    }
  }

}
