import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { Question } from '../question/question.component';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [ QuestionService ]
})
export class WallComponent implements OnInit {

	// allQuestions: Array<any>;
	// response$;
  //
  //   constructor( private qService: QuestionService ) { }
  //
  //   ngOnInit( ) {
  //   	this.subscribeData( );
  //   }
  //
  //   test( ) {
  //   	this.qService.log( );
  //   }
  //
  //   subscribeData( ) {
  //   	this.response$ = this.qService.getAllQuestions( );
  //
  //   	this.response$.subscribe(
  //   		res => this.allQuestions = res,
  //   		() => {},
  //   		() => console.log( "OK: completed!" )
  //   	);
  //   }

   questions: Question[];

   protected indices: ChangeEvent;
   protected buffer: Question[] = [];
   protected readonly bufferSize: number = 10;
   protected timer;
   protected loading: boolean;

  constructor(private qService: QuestionService) { }

  ngOnInit() {
    this.qService.getAllQuestions().subscribe(
      (dataQuestions) => {this.questions = dataQuestions.data, this.reset()}
    );
  }

  protected reset() {
    this.fetchNextChunk(0, this.bufferSize, {}).then(chunk => this.buffer = chunk);
  }

  protected fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      this.loading = true;
      this.fetchNextChunk(this.buffer.length, this.bufferSize, event).then(chunk => {
        this.buffer = this.buffer.concat(chunk);
        this.loading = false;
      }, () => this.loading = false);
    }
  }

  protected fetchNextChunk(skip: number, limit: number, event?: any): Promise<Question[]> {
     return new Promise((resolve, reject) => {
       clearTimeout(this.timer);
       this.timer = setTimeout(() => {
         if (skip < this.questions.length) {
           return resolve(this.questions.slice(skip, skip + limit));
         }
         reject();
       }, 1000 + Math.random() * 1000);
     });
  }
}
