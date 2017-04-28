import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {TagService} from '../tag.service';
import {TopicService} from '../topic.service';
import {QuestionService} from '../question.service';
import {style, state, animate, transition, trigger} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Question} from '../question';
import 'rxjs/add/operator/startWith';

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
    ])
  ]
})
export class AskiitComponent implements OnInit {

  stateCtrl: FormControl;

  allTags: Array<any>;
  allTopics: Array<any>;

  selectedTopic: string;
  selectedTags: string[] = [];

  StateSelectTopic:boolean = false;
  StateSelectTags: Array<boolean> = [false, false, false];

  constructor(public dialogRef: MdDialogRef<AskiitComponent>, private tagService: TagService, private topicService: TopicService, private questionService: QuestionService,) {  }

  askiitForm = new FormGroup({
    title: new FormControl(null,[Validators.required,Validators.minLength(12),Validators.maxLength(140)]),
    body: new FormControl(null,[Validators.maxLength(500)]),
    topic: new FormControl(null,[Validators.required])
  });

  ngOnInit() {
    this.subscribeData();
  }

  subscribeData( ) {
    // Todos los tags
    this.tagService.getAllTags( ).subscribe(
      res => this.allTags = res,
    );
    // Todos los topics
    this.topicService.getAllTopics( ).subscribe(
      res => this.allTopics = res,
    );
  }

  OnSelectTopic(input){
    this.selectedTopic = input.value;
    this.StateSelectTopic = true;
  }

  OnDelecteTopic(){
    this.selectedTopic = null;
    this.StateSelectTopic = false;
  }

  OnSelectTag(input, index){
    this.selectedTags[index] = input.value;
    this.StateSelectTags[index] = true;
  }

  OnDelecteTag(index){
    this.selectedTags[index] = null;
    this.StateSelectTags[index] = false;
  }

  OnAskiit(title, body){
    const question = new Question(title.value, body.value, this.selectedTopic, "1", "1", this.selectedTags);
    this.questionService.postQuestion(question).subscribe(
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

}
