import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { Question } from '../question/question.component';
import { QuestionService } from '../question.service';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [ QuestionService ]
})
export class WallComponent implements OnInit {

    filters = {
        topics: [],
        tags: []
    }

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

   questions: Question[];

   protected indices: ChangeEvent;
   protected buffer: Question[] = [];
   protected readonly bufferSize: number = 10;
   protected timer;
   protected loading: boolean;
   protected initialResponse = false;
   protected page: number = 1;
   scrollState = 2;

  constructor(private qService: QuestionService, private ngRedux: NgRedux<IAppState>) {
      ngRedux.select( 'filters' ).subscribe(
          value => {
              this.filters = <{ tags: Array<any>, topics: Array<any> }> value;
              this.filterUpdateQuestions();
              this.page = 1;
              this.initialResponse = true;
          }
      )
  }

  ngOnInit() {
  }

  filterUpdateQuestions(){
    if(this.filters.topics.length > 0 || this.filters.tags.length > 0){
      this.qService.getAllQuestionsFilter( this.filters.tags, this.filters.topics, 1 ).subscribe(
        (dataQuestions)  =>  {this.validateQuestions(dataQuestions);
                              this.buffer = dataQuestions}
      )
    }else{
      this.qService.getAllQuestionsByPage(this.page).subscribe(
        (dataQuestions) => {this.validateQuestions(dataQuestions);
                            this.buffer = dataQuestions}
      )
    }
  }

  validateQuestions(dataQuestions){
    if(dataQuestions.error != null){
      this.scrollState = 0;
    }else if(dataQuestions.length < 20){
      this.scrollState = 1;
    }else{
      this.scrollState = 2;
    }
  }

  protected fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      this.loading = true;
      this.page = this.page + 1;
      this.timer = setTimeout(() => {
        this.filterFetchQuestions();
      }, 1000 + Math.random() * 1000);
    }
  }

  filterFetchQuestions(){
    if(this.filters.topics.length > 0 || this.filters.tags.length > 0){
      this.qService.getAllQuestionsFilter( this.filters.tags, this.filters.topics, 1 ).subscribe(
        (dataQuestions)  =>  {this.buffer = this.buffer.concat(dataQuestions), this.loading = false}
      )
    }else{
      this.qService.getAllQuestionsByPage(this.page).subscribe(
        (dataQuestions)   => {this.buffer = this.buffer.concat(dataQuestions), this.loading = false}
      )
    }
  }

  refresh(e){
    this.virtualScroll.refresh();
  }

}
