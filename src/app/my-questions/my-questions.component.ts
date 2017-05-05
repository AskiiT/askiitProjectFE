import { Component, OnInit, ViewChild  } from '@angular/core';
import { QuestionService } from '../question.service';
import { VirtualScrollComponent, ChangeEvent } from 'angular2-virtual-scroll';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'],
  providers: [QuestionService]
})
export class MyQuestionsComponent implements OnInit {

  protected user = {}
  public filters = {
      topics: [],
      tags: []
  }

  protected indices: ChangeEvent;
  // protected buffer: Question[] = [];
  protected readonly bufferSize: number = 10;
  protected timer;
  protected loading: boolean;
  protected initialResponse = false;
  protected page: number = 1;
  scrollState = 2;

  constructor(private qService: QuestionService, private ngRedux: NgRedux<IAppState>) {
    ngRedux.select('authUserData').subscribe(
      userData => {
          this.user = userData;
          console.log(this.user);
      }
    )
    ngRedux.select('filters').subscribe(
        filterData => {
            this.filters = <{ tags: Array<any>, topics: Array<any> }> filterData;
            this.page = 1;
            // this.filterUpdateQuestions();
            this.initialResponse = true;
        }
    )
  }

  ngOnInit() {
  }

}
