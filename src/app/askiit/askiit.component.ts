import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {TagService} from '../tag.service';
import {TopicService} from '../topic.service';
import {QuestionService} from '../question.service';
import {style, state, animate, transition, trigger} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Question} from '../question';
import 'rxjs/add/operator/startWith';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-askiit',
  templateUrl: './askiit.component.html',
  styleUrls: ['./askiit.component.css'],
  providers: [TagService, TopicService, QuestionService],
  animations: [
      trigger('slideIn', [
        state('*', style({})),
        state('void', style({})),
        transition('* => void', [
            style({ height: '*' }),
            animate(150, style({ height: 0}))
        ]),
        transition('void => *', [
            style({ height: '0' }),
            animate(150, style({ height: '*' }))
        ])
    ]),
    trigger('fadeInOut', [
        transition(':enter', [
          style({opacity:0}),
          animate(200, style({opacity:1}))
        ]),
        transition(':leave', [
          animate(200, style({opacity:0}))
        ])
    ])
  ]
})
export class AskiitComponent implements OnInit {

  stateCtrl: FormControl;

  allTags: any;
  allTopics: any;

  selectedTopics: Array<any>;
  selectedTags: Array<any>;

  tagsResponse$;
  topicsResponse$;

  tagGotResponse: boolean = true;
  topicGotResponse: boolean = true;


  selectedTopic: string;

  StateSelectTopic:boolean = false;
  chipClicked: boolean = false;

  constructor(public dialogRef: MdDialogRef<AskiitComponent>, private tagService: TagService, private topicService: TopicService,
      private questionService: QuestionService, private authService: AuthService ) {
    this.selectedTopics = new Array<any>( );
    this.selectedTags = new Array<any>( );
  }

  askiitForm = new FormGroup({
    title: new FormControl(null,[Validators.required,Validators.minLength(12),Validators.maxLength(140)]),
    body: new FormControl(null,[Validators.maxLength(500)]),
    topic: new FormControl(null,[Validators.required]),
    tag: new FormControl(null)
  });

  ngOnInit() {

  }

  subscribeData( term ) {

      this.topicsResponse$ = this.topicService.getTopicsByMatch( term );

      this.topicsResponse$.subscribe(
        res => { this.allTopics = res, this.topicGotResponse = true },
        () => {},
        () => console.log( "OK: topics match completed!" )
      );


  }

  subscribeData1(term1){
    this.tagsResponse$ = this.tagService.getTagsByMatch( term1 );

    this.tagsResponse$.subscribe(
      res => { this.allTags = res, this.tagGotResponse = true },
      () => {},
      () => console.log( "OK: tags match completed!" )
    );
  }

  checkForTagsEmptyResponse( term1 ) {
      if ( term1 === '' )
          return false;
      if ( this.allTags instanceof Array )
          return true;
      return false;
  }

  checkForTopicsEmptyResponse( term ) {
      if ( term === '' )
          return false;
      if ( this.allTopics instanceof Array )
          return true;
      return false;
  }

  inputChange( term ) {
      if ( term != '' ) {
          this.topicGotResponse = false;
          this.subscribeData( term );
      } else {
          this.allTopics = null;
      }
  }

  inputChange1( term1 ) {
      if ( term1 != '' ) {
          this.tagGotResponse = false;
          this.subscribeData1( term1 );
          this.chipClicked = false;
      } else {
          this.allTags = null;
      }
  }


  OnSelectTopic(tname){
    this.StateSelectTopic = true;
    this.selectedTopic = tname;

  }

  OnDelecteTopic(){
    this.selectedTopic = null;
    this.StateSelectTopic = false;
  }



  OnAskiit(title, body){
    const question = new Question(title.value, body.value, this.selectedTopic, "1", "1", this.selectedTags);
    this.questionService.postQuestion(question, this.authService.headers( ) ).subscribe(
      res => {console.log(res), this.responseValidation(res)}
    );
  }

  responseValidation(res){
    if(res.error == null){
      this.dialogRef.close();
    }
  }

  closeAskiit(){
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.askiitForm.value);
  }

  addTag( tag ) {
      if ( !this.selectedTags.includes( tag ) && this.selectedTags.length < 3 )
          this.selectedTags.push( tag );
      this.chipClicked = true;
  }

  removeTag( index ) {
      this.selectedTags = this.selectedTags.slice( 0, index )
          .concat( this.selectedTags.slice( index + 1, this.selectedTags.length ) );
  }

}
