import { Component, OnInit, ViewChild  } from '@angular/core';
import { MyQuestion } from '../my-question/my-question.component';
import { QuestionService } from '../question.service';
import { VirtualScrollComponent, ChangeEvent } from 'angular2-virtual-scroll';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

interface User {
    id?: number;
}

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'],
  providers: [QuestionService]
})
export class MyQuestionsComponent implements OnInit {

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

  protected user : User;
  public filters = {
      topics: [],
      tags: []
  }

  protected indices: ChangeEvent;
  protected buffer: MyQuestion[] = [];
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
          ngRedux.select('filters').subscribe(
              filterData => {
                  this.filters = <{ tags: Array<any>, topics: Array<any> }> filterData;
                  this.page = 1;
                  this.filterUpdateQuestions();
                  this.initialResponse = true;
              }
          )
      }
    )

  }

  ngOnInit() {
  }

  filterUpdateQuestions(){
      this.qService.getAllUserQuestionsByPage(this.user.id, this.page).subscribe(
        (dataQuestions)   =>  { this.validateUpdateQuestions(dataQuestions),
                                this.buffer = dataQuestions
                              }
      )
  }

  validateUpdateQuestions(dataQuestions){
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
        this.timer = setTimeout(() => {
        this.filterFetchQuestions();
      }, 1000 + Math.random() * 1000);
    }
  }

  filterFetchQuestions(){
    this.qService.getAllQuestionsByPage(this.page).subscribe(
        (dataQuestions)   => {this.validateFetchQuestions(dataQuestions);
                              this.loading = false}
    )
  }

  validateFetchQuestions(dataQuestions){
    if(dataQuestions.error == null){
        this.page++;
        this.buffer = this.buffer.concat(dataQuestions);
    }
  }

  refresh(e){
      this.virtualScroll.refresh();
  }



}
