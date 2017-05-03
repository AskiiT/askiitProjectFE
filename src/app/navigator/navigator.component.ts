import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

    userData$: Observable<any>;

    userDataDic: any;
    authHeaders: any;

    constructor( private ngRedux: NgRedux<IAppState> ) {
        ngRedux.select( 'authUserData' ).subscribe(
            value => this.userDataDic = value
        );

        ngRedux.select( 'headers' ).subscribe(
            value => this.authHeaders = value
        );
    }

    ngOnInit() {
    }

    showCurrentUserData( ) {
        console.log( this.userDataDic )
        console.log( this.authHeaders )
    }

}
