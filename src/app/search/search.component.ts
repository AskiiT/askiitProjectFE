import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { TopicService } from '../topic.service';
import {style, state, animate, transition, trigger} from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { UPDATE_QUESTION_FILTER } from '../actions';
import { NgZone } from '@angular/core';

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
    chipClicked: boolean = false;

    term: string = '';
    catchedTerm: string = '';
    _timeout: any = null;

    constructor( private tagService: TagService, private topicService: TopicService, private ngRedux: NgRedux<IAppState>,
            public lc: NgZone ) {
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

    someChipWasClicked( ) {
        return this.chipClicked;
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

    inputChange( input ) {

        this.allTags = null;
        this.allTopics = null;

        if( this._timeout != null ) {
            window.clearTimeout( this._timeout );
        }

        this._timeout = window.setTimeout( () => {
            this._timeout = null;
            this.lc.run( () => this.catchedTerm = this.term );
            if ( this.catchedTerm.search( ' ' ) == -1 && this.catchedTerm != '' )
            {
                this.tagGotResponse = false;
                this.topicGotResponse = false;
                this.chipClicked = false;
                this.subscribeData( this.catchedTerm );
            }
        }, 600 );
    }

    addTopic( topic ) {
        if ( !this.selectedTopics.includes( topic ) )
        {
            this.selectedTopics.push( topic );
            this.ngRedux.dispatch({
                type: UPDATE_QUESTION_FILTER,
                payload: {
                    topics: this.selectedTopics,
                    tags: this.selectedTags
                }
            });
        }
        this.chipClicked = true;
    }

    addTag( tag ) {
        if ( !this.selectedTags.includes( tag ) )
        {
            this.selectedTags.push( tag );
            this.ngRedux.dispatch({
                type: UPDATE_QUESTION_FILTER,
                payload: {
                    topics: this.selectedTopics,
                    tags: this.selectedTags
                }
            });
        }
        this.chipClicked = true;
    }

    removeTopic( index ) {
        this.selectedTopics = this.selectedTopics.slice( 0, index )
            .concat( this.selectedTopics.slice( index + 1, this.selectedTopics.length ) );
        this.ngRedux.dispatch({
            type: UPDATE_QUESTION_FILTER,
            payload: {
                topics: this.selectedTopics,
                tags: this.selectedTags
            }
        });
    }

    removeTag( index ) {
        this.selectedTags = this.selectedTags.slice( 0, index )
            .concat( this.selectedTags.slice( index + 1, this.selectedTags.length ) );
        this.ngRedux.dispatch({
            type: UPDATE_QUESTION_FILTER,
            payload: {
                topics: this.selectedTopics,
                tags: this.selectedTags
            }
        });
    }

    blurEvent( ) {
        this.chipClicked = true;
    }

}
