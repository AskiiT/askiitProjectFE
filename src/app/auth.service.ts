import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable } from "rxjs";
import { Response } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import { UPDATE_AUTH_USER } from './actions';

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor( private authService: Angular2TokenService, private ngRedux: NgRedux<IAppState> ) {

    // this.authService.validateToken().subscribe(
    //     res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false),
    // )
  }

  logOutUser( ): Observable<Response> {

    return this.authService.signOut( ).map(
        res => {
          this.userSignedIn$.next( false );
          return res;
        }
    );
  }

  headers( ) {
      return this.authService.currentAuthData;
  }

  logInUser( signInData: { email: string, password: string } ): Observable<Response> {

    return this.authService.signIn( signInData ).map(
        res => {
          this.userSignedIn$.next( true );

          this.ngRedux.dispatch({
              type: UPDATE_AUTH_USER,
              payload: {
                  userData: this.authService.currentUserData,
                  authHeaders:  this.headers( )
              }
          });

          return res
        }
    );

  }

}
