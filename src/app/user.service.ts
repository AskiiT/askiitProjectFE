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

  getRankByUsername( username ) {
    return this.http.get( 'http://localhost:3000/api/v1/users/' + username+'/rank').map( ( res: Response ) => res.json( ).data );
  }

}
