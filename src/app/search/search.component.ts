import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ TagService, TopicService ]
})
export class SearchComponent implements OnInit {

	allTags: Array<any>;
  allTopics: Array<any>;

	tagsResponse$;
  topicsResponse$;

  empty:boolean=false;
  term:string;
    constructor( private tagService: TagService, private topicService: TopicService ) { }

    ngOnInit( ) {
    	this.subscribeData( );
    }

    subscribeData( ) {
    	this.tagsResponse$ = this.tagService.getAllTags( );

    	this.tagsResponse$.subscribe(
    		res => this.allTags = res,
    		() => {},
    		() => console.log( "OK: completed!" )
    	);

      this.tagsResponse$ = this.topicService.getAllTopics( );

      this.tagsResponse$.subscribe(
        res => this.allTopics = res,
        () => {},
        () => console.log( "OK: completed!" )
      );
    }
    isEmpty(){
      if (this.term.length > 0){
        this.empty = true;
        console.log(this.term);
      }else{
        this.empty = false;
        console.log(0);
      }
    }
}
