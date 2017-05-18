import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TopicService {

  backPath: string = 'https://askiit.herokuapp.com/api/v1';

  constructor( private http: Http ) { }

  getAllTopics( ) {
  	return this.http.get( this.backPath + '/topics' ).map( ( res: Response ) => res.json( ).data );
  }

  getTopicsByMatch( subString ) {
  	return this.http.get( this.backPath + '/topics/search/' + subString )
        .map( ( res: Response ) => res.json( ).data );
  }
}
