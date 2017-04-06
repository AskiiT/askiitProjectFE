import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ TagService ]
})
export class SearchComponent implements OnInit {

	allTags: Array<any>;
	response$;
  empty:boolean=false;
  term:string;
    constructor( private tService: TagService ) { }

    ngOnInit( ) {
    	this.subscribeData( );
    }

    subscribeData( ) {
    	this.response$ = this.tService.getAllTags( );

    	this.response$.subscribe(
    		res => this.allTags = res,
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
