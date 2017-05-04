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

  constructor(private qService: QuestionService, private ngRedux: NgRedux<IAppState>) {
      ngRedux.select( 'filters' ).subscribe(
          value => {
              this.filters = <{ tags: Array<any>, topics: Array<any> }> value;
          }
      )
  }


  ngOnInit() {
    this.qService.getAllQuestionsByPage(this.page).subscribe(
      (dataQuestions) => {this.buffer = dataQuestions, this.initialResponse = true}
    );
  }

  showData( ) {
      console.log( this.filters.tags )
      console.log( this.filters.topics )
  }

  protected fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      this.loading = true;
      this.page = this.page + 1;
      this.timer = setTimeout(() => {
        this.qService.getAllQuestionsByPage(this.page).subscribe(
          (chunk) => {this.buffer = this.buffer.concat(chunk), this.loading = false}
        );
      }, 1000 + Math.random() * 1000);
    }
  }

  refresh(e){
    this.virtualScroll.refresh();
  }

}
