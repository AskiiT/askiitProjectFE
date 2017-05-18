import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';;

@Injectable()
export class QuestionService {

  headers: any;
  userData: any;
  backPath: string = 'https://askiit.herokuapp.com/api/v1';

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
  	  return this.http.get( this.backPath + '/questions' )
  	      .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByPage( page ){
    return this.http.get( this.backPath + '/questions?page=' + page )
        .map( ( res: Response ) => res.json( ).data );
  }

  getAllUserQuestionsByPage( userID, page ){
    return this.http.get( this.backPath + '/users/' + userID + '/my-questions?page=' + page )
        .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByTag( tagName ) {
  	  return this.http.get( this.backPath + '/questions/tagsearch/' + tagName )
  		    .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsByTopic( topicName ) {
      return this.http.get( this.backPath + '/questions/topicsearch/' + topicName )
          .map( ( res: Response ) => res.json( ).data );
  }

  getAllQuestionsFilter( tags, topics, page){
    var stopics = "";
    if(topics.length > 0)
      stopics = ",to_" + topics.join(",to_");
    return this.http.get( this.backPath + '/questions/tagsearch/' + tags.join() + stopics + '?page=' + page )
          .map( ( res: Response ) => res.json( ).data );
  }

  postQuestion( question ) {
    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});

    return this.http.post( this.backPath + '/questions', JSON.stringify(question), options )
          .map( ( res: Response ) => res.json( ) );
  }

  postulateToQuestion( questionId ){
    const user = {"user_id": this.userData.id};
    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});

    return this.http.post( this.backPath + '/questions/'+ questionId +'/postulate', JSON.stringify(user), options)
          .map( ( res: Response ) => res.json( ) );
  }

  unpostulateToQuestion( questionId ){
    const user = {"user_id": this.userData.id};
    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});

    return this.http.delete( this.backPath + '/questions/'+ questionId +'/unpostulate?user_id=' + this.userData.id,
        options ).map( ( res: Response ) => res.json( ) );
  }

  deleteQuestion( id ) {
      const headers = new Headers( this.headers );
      const options = new RequestOptions({headers: headers});

      return this.http.delete( this.backPath + '/questions/'+ id,
          options ).map( ( res: Response ) => res.json( ) );
  }

}
