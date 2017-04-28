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
    ]),
    trigger('fadeInOut', [
        transition(':enter', [
          style({opacity:0}),
          animate(250, style({opacity:1}))
        ]),
        transition(':leave', [
          animate(250, style({opacity:0}))
        ])
    ])
  ]
})
export class SearchComponent implements OnInit {

	allTags: any;
    allTopics: any;

    selectedTopics: Array<any>;
    selectedTags: Array<any>;

	tagsResponse$;
    topicsResponse$;

    tagGotResponse: boolean = true;
    topicGotResponse: boolean = true;

    constructor( private tagService: TagService, private topicService: TopicService ) {
        this.selectedTopics = new Array<any>( );
        this.selectedTags = new Array<any>( );
    }

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

    addTopic( topic ) {
        if ( !this.selectedTopics.includes( topic ) )
            this.selectedTopics.push( topic );
    }

    addTag( tag ) {
        if ( !this.selectedTopics.includes( tag ) )
            this.selectedTags.push( tag );
    }

    removeTopic( index ) {
        this.selectedTopics = this.selectedTopics.slice( 0, index )
            .concat( this.selectedTopics.slice( index + 1, this.selectedTopics.length ) );
    }

    removeTag( index ) {
        this.selectedTags = this.selectedTags.slice( 0, index )
            .concat( this.selectedTags.slice( index + 1, this.selectedTags.length ) );
    }

}
