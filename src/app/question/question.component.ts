import { Component, Input,  OnInit} from '@angular/core';

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

  @Input()
  question: Question;
  expand: boolean = false;
  tags;

  ngOnInit(){
    this.tags = ( '#' + String( this.question.topic.color  ) );
  }

  onChange(){
    this.expand = (this.expand == false ? this.expand = true : this.expand = false);
  }

}
