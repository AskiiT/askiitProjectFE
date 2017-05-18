import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ReportService {

    headers: any;

    constructor( private http: Http, private ngRedux: NgRedux<IAppState> ) {
        ngRedux.select( 'headers' ).subscribe(
            value => {
                this.headers = value;
                if ( this.headers === undefined )
                  console.log( 'There are no headers :(' )
              }
        );
    }

    postReport( questionId, reason ) {
        const content = { 'reason': reason };
        const headers = new Headers( this.headers );
        const options = new RequestOptions( { headers: headers } );

        return this.http.post( 'http://localhost:3000/api/v1/questions/' + questionId + '/report',
            JSON.stringify( content ), options )
                .map( ( res: Response ) => res.json( ) );
    }

}
