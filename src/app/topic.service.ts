import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TopicService {

  constructor( private http: Http ) { }

  getAllTopics( ) {
  	return this.http.get( 'http://localhost:3000/api/v1/topics' ).map( ( res: Response ) => res.json( ).data );
  }

  getTopicsByMatch( subString ) {
  	return this.http.get( 'http://localhost:3000/api/v1/topics/search/' + subString )
        .map( ( res: Response ) => res.json( ).data );
  }
}
