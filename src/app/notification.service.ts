import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class NotificationService {

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

    getNotifications( ) {
        const headers = new Headers( this.headers );
        const options = new RequestOptions( { headers: headers } );

        return this.http.get( 'http://localhost:3000/api/v1/notifications', options )
            .map( ( res: Response ) => res.json( ).data );
    }

}
