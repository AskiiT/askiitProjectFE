import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  constructor( private http: Http ) { }

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

      console.log( user );

    const headers = new Headers( { 'Content-Type': 'application/json; charset=utf-8' } );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( 'http://localhost:3000/api/v1/auth', JSON.stringify( user ), options )
          .map( ( res: Response ) => res.json( ).data );
  }

}
