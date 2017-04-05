import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TagService {

  constructor( private http: Http ) { }

  getAllTags( ) {
  	return this.http.get( 'http://localhost:3000/api/v1/tags' ).map( ( res: Response ) => res.json( ).data );
  }

}
