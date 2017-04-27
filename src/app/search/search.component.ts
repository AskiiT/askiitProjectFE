import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { TopicService } from '../topic.service';
import {style, state, animate, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ TagService, TopicService ],
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
export class SearchComponent implements OnInit {

	allTags: any;
    allTopics: any;

	tagsResponse$;
    topicsResponse$;

    empty:boolean=false;
    term:string;
    constructor( private tagService: TagService, private topicService: TopicService ) { }

    ngOnInit( ) {

    }

    subscribeData( term ) {
    	this.tagsResponse$ = this.tagService.getTagsByMatch( term );

    	this.tagsResponse$.subscribe(
    		res => this.allTags = res,
    		() => {},
    		() => console.log( "OK: tags match completed!" )
    	);

      this.tagsResponse$ = this.topicService.getTopicsByMatch( term );

      this.tagsResponse$.subscribe(
        res => this.allTopics = res,
        () => {},
        () => console.log( "OK: topics match completed!" )
      );
    }

    checkForTagsEmptyResponse( term ) {
        if ( term === '' )
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
        if ( term != '' )
            this.subscribeData( term );
    }
}
