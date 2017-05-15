import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';;

@Injectable()
export class QuestionService {

  headers: any;
  userData: any;

  constructor( private http: Http, private ngRedux: NgRedux<IAppState> ) {
      ngRedux.select( 'headers' ).subscribe(
          value => {
              this.headers = value;
              if ( this.headers === undefined )
                console.log( 'There are no headers :(' )
            }
      );

      ngRedux.select( 'authUserData' ).subscribe(
          value => {
              this.userData = value;
              if ( this.userData === undefined )
                console.log( 'There is not user data :(' )
            }
      )
  }

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

  getAllUserQuestionsByPage( userID, page ){
    return this.http.get( 'http://localhost:3000/api/v1/users/' + userID + '/my-questions?page=' + page )
        .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByTag( tagName ) {
  	  return this.http.get( 'http://localhost:3000/api/v1/questions/tagsearch/' + tagName )
  		    .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByTopic( topicName ) {
      return this.http.get( 'http://localhost:3000/api/v1/questions/topicsearch/' + topicName )
          .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsFilter( tags, topics, page){
    var stopics = "";
    if(topics.length > 0)
      stopics = ",to_" + topics.join(",to_");
    return this.http.get( 'http://localhost:3000/api/v1/questions/tagsearch/' + tags.join() + stopics + '?page=' + page )
          .map( ( res: Response ) => res.json( ).data );
  }

  postQuestion( question ) {
    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});

    return this.http.post( 'http://localhost:3000/api/v1/questions', JSON.stringify(question), options )
          .map( ( res: Response ) => res.json( ).data );
  }

  postulateToQuestion( questionId ){
    const user = {"user_id": this.userData.id};
    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});

    return this.http.post( 'http://localhost:3000/api/v1/questions/'+ questionId +'/postulate', JSON.stringify(user), options)
          .map( ( res: Response ) => res.json( ) );
  }

  unpostulateToQuestion( questionId ){
    const user = {"user_id": this.userData.id};
    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});

    return this.http.delete( 'http://localhost:3000/api/v1/questions/'+ questionId +'/unpostulate?user_id=' + this.userData.id,
        options ).map( ( res: Response ) => res.json( ) );
  }

  deleteQuestion( id ) {
      const headers = new Headers( this.headers );
      const options = new RequestOptions({headers: headers});

      return this.http.delete( 'http://localhost:3000/api/v1/questions/'+ id,
          options ).map( ( res: Response ) => res.json( ) );
  }

}
