import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [ QuestionService ]
})
export class WallComponent implements OnInit {

	data: Array<any>;
	response$;

    constructor( private qService: QuestionService ) { }

    ngOnInit( ) {
    	this.subscribeData( );
    }

    test( ) {
    	this.qService.log( );
    }

    subscribeData( ) {
    	this.response$ = this.qService.getData( );

    	this.response$.subscribe( 
    		res => this.data = res,
    		() => {},
    		() => console.log( "OK: completed!" )
    	);
    }

}
