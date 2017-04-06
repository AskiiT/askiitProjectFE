import { Component, Input } from '@angular/core';

export interface Question {
    id?: number;
    title?: string;
    body?: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input()
  question: Question;
}
