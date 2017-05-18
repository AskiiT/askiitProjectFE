import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TagService {

  backPath: string = 'https://askiit.herokuapp.com/api/v1';

  constructor( private http: Http ) { }

  getAllTags( ) {
  	return this.http.get( this.backPath + '/tags' ).map( ( res: Response ) => res.json( ).data );
  }

  getTagsByMatch( subString ) {
    return this.http.get( this.backPath + '/tags/search/' + subString )
        .map( ( res: Response ) => res.json( ).data );
  }

}
