import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {TagService} from '../tag.service';
import {TopicService} from '../topic.service';
import {style, state, animate, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-askiit',
  templateUrl: './askiit.component.html',
  styleUrls: ['./askiit.component.css'],
  providers: [TagService, TopicService],
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

  allTags: Array<any>;
  allTopics: Array<any>;

  selectedTags:string[] = [];

  openBox: boolean = false;
  term:string;

  constructor(public dialogRef: MdDialogRef<AskiitComponent>, private tagService: TagService, private topicService: TopicService) { }

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

  isEmpty(){
    if (this.term.length > 0){
      this.openBox = true;
    }else{
      this.openBox = false;
    }
  }

  addTopic(topic, input){
    this.selectedTags = this.selectedTags.concat(topic);
    this.openBox = false;
    input.value = null;
  }

  addTag(tag, input){
    this.selectedTags = this.selectedTags.concat(tag);
    this.openBox = false;
    input.value = null;
  }

}
