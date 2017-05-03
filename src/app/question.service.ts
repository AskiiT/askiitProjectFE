import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class QuestionService {

  constructor( private http: Http,) { }

  log ( ) {
  	  console.log( "I am the question service." );
  }

  getAllQuestions( ) {
  	  return this.http.get( 'http://localhost:3000/api/v1/questions' )
  	      .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByPage( page ){
    return this.http.get( 'http://localhost:3000/api/v1/questions?page=' + page )
        .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByTag( tagName ) {
  	  return this.http.get( 'http://localhost:3000/api/v1/questions/tagsearch/' + tagName )
  		    .map( ( res: Response ) => res.json( ).data );
  }

  postQuestion( question, authHeaders ) {
    const headers = new Headers( {
            'Content-Type': 'application/json; charset=utf-8',
            'access-token': authHeaders.accessToken,
            'client': authHeaders.client,
            'expiry': authHeaders.expiry,
            'token-type': authHeaders.tokenType,
            'uid': authHeaders.uid
        }
    );
    const options = new RequestOptions({headers: headers});

    return this.http.post( 'http://localhost:3000/api/v1/questions', JSON.stringify(question), options )
          .map( ( res: Response ) => res.json( ).data );
  }

  postulateToQuestion( questionId, userId ){
    const user = {"user_id": userId};
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    const options = new RequestOptions({headers: headers});

    return this.http.post( 'http://localhost:3000/api/v1/questions/'+ questionId +'/postulate', JSON.stringify(user), options)
          .map( ( res: Response ) => res.json( ).data );
  }

  unpostulateToQuestion( questionId, userId ){
    const user = {"user_id": userId};
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    const options = new RequestOptions({headers: headers});

    return this.http.delete( 'http://localhost:3000/api/v1/questions/'+ questionId +'/unpostulate?user_id=' + userId, options)
          .map( ( res: Response ) => res.json( ).data );
  }

}
