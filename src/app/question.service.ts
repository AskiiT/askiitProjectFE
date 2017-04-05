import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class QuestionService {

  constructor( private http: Http ) { }

  log ( ) {
  	console.log( "I am the question service." );
  }

  getAllQuestions( ) {
  	return this.http.get( 'http://localhost:3000/api/v1/questions' ).map( ( res: Response ) => res.json( ).data );
  }

}
