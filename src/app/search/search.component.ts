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

    tagGotResponse: boolean = true;
    topicGotResponse: boolean = true;

    constructor( private tagService: TagService, private topicService: TopicService ) { }

    ngOnInit( ) {

    }

    subscribeData( term ) {

        this.topicsResponse$ = this.topicService.getTopicsByMatch( term );

        this.topicsResponse$.subscribe(
          res => { this.allTopics = res, this.topicGotResponse = true },
          () => {},
          () => console.log( "OK: topics match completed!" )
        );

    	this.tagsResponse$ = this.tagService.getTagsByMatch( term );

    	this.tagsResponse$.subscribe(
    		res => { this.allTags = res, this.tagGotResponse = true },
    		() => {},
    		() => console.log( "OK: tags match completed!" )
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
        if ( term != '' ) {
            this.tagGotResponse = false;
            this.topicGotResponse = false;
            this.subscribeData( term );
        }
        else {
            this.allTopics = null;
            this.allTags = null;
        }
    }
}
