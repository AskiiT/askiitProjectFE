import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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

}
