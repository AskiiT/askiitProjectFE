import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { INCREMENT } from '../actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public title = 'AskiiT';

  counter$: Observable<any>;
  num: any;

  constructor( private ngRedux: NgRedux<IAppState> ) {
      this.counter$ = ngRedux.select( 'counter' );
      this.counter$.subscribe(
          value => this.num = value
      )
  }

  ngOnInit() {
  }

  increment( ) {
      this.ngRedux.dispatch( { type: INCREMENT, payload: { amount: 3 } } );
  }
}
