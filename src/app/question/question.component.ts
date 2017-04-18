import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

export interface Question {
    id?: number;
    title?: string;
    body?: string;
    topic?: any;
    tags?: Array<any>;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() onResize = new EventEmitter();


  expand: boolean = false;
  topicColor;

  ngOnInit(){
    this.topicColor = ( '#' + String( this.question.topic.color  ) );
  }

  onChange(e){
    this.expand = (this.expand == false ? this.expand = true : this.expand = false);
    this.onResize.emit(e)
  }

}
