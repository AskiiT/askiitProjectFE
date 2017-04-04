import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [ QuestionService ]
})
export class WallComponent implements OnInit {

	allQuestions: Array<any>;
	response$;

    constructor( private qService: QuestionService ) { }

    ngOnInit( ) {
    	this.subscribeData( );
    }

    test( ) {
    	this.qService.log( );
    }

    subscribeData( ) {
    	this.response$ = this.qService.getAllQuestions( );

    	this.response$.subscribe( 
    		res => this.allQuestions = res,
    		() => {},
    		() => console.log( "OK: completed!" )
    	);
    }

}
