import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';

declare var firebase: any;

@Injectable()
export class UserService {

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

  getAllUsers( ) {
  	return this.http.get( 'http://localhost:3000/api/v1/users' ).map( ( res: Response ) => res.json( ).data );
  }

  getUserByUsername( username ) {
  	return this.http.get( 'http://localhost:3000/api/v1/users/' + username).map( ( res: Response ) => res.json( ).data );
  }

  getUsersByMatch( subString ) {
      return this.http.get( 'http://localhost:3000/api/v1/users/search/username/' + subString )
        .map( ( res: Response ) => res.json( ).data );
  }

  getUsersByMail( subString ) {
      return this.http.get( 'http://localhost:3000/api/v1/users/search/email/' + subString )
        .map( ( res: Response ) => res.json( ).data );
  }

  postUser( formData, color ) {

      var user = {
          "email": formData.email,
          "first_name": formData.first_name,
          "last_name": formData.last_name,
          "username": formData.username,
          "password": formData.password,
          "color": color
      }

    const headers = new Headers( { 'Content-Type': 'application/json; charset=utf-8' } );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( 'http://localhost:3000/api/v1/auth', JSON.stringify( user ), options )
          .map( ( res: Response ) => res );
  }

  logInToFirebase( user ) {
      firebase.auth( ).signInWithEmailAndPassword( user.email, user.password ).catch(
          (error) => {
              console.log( error )
          }
      )
  }

  postUserToFirebase( formData ) {
      firebase.auth( ).createUserWithEmailAndPassword( formData.email, formData.password ).catch(
          (error) => {
              console.log( error )
          }
      );
  }

  updateUser(formData){
    var user:any;
    user = {
      "first_name": formData.first_name,
      "last_name": formData.last_name,
      "description": formData.body
    };



    const headers = new Headers( this.headers );
    const options = new RequestOptions({headers: headers});
    console.log(formData.first_name);

    return this.http.patch( 'http://localhost:3000/api/v1/users/'+ this.userData.id, JSON.stringify( user ),
        options ).map( ( res: Response ) => res);
  }

}
