import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable } from "rxjs";
import { Response } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { UPDATE_AUTH_USER } from '../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private authService: Angular2TokenService, private ngRedux: NgRedux<IAppState> ) {
      authService.validateToken( ).subscribe(
          res =>
          ngRedux.dispatch({
              type: UPDATE_AUTH_USER,
              payload: {
                  userData: this.authService.currentUserData,
                  authHeaders:  this.authService.currentAuthData
              }
          })
      )
  }

  ngOnInit() {
  }

}
