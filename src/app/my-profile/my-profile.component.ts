import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [ UserService ]
})
export class MyProfileComponent implements OnInit {

  userData: any;
  userData1: any;
  percentq:string;
  percente:string;
  percentc:string;
  response$;
  edit:boolean=false;
  public usernameParam: String;

  constructor( private ngRedux: NgRedux<IAppState>,private uService: UserService) {
    ngRedux.select( 'authUserData' ).subscribe(
        value => {
            this.userData = value;
            if ( this.userData === undefined )
              console.log( 'There is not user data :(' )
          }
    )

  }

  ngOnInit() {
    setTimeout(() =>this.subscribeData( ) , 100);

  }

  subscribeData( ) {
    this.usernameParam = this.userData.username;
    this.response$ = this.uService.getUserByUsername( this.usernameParam );

    this.response$.subscribe(
      res => {
              this.userData1 = res[ 0 ],
              this.percente = ( String( this.userData1.rank.efectiveness * 100 / 5741 ) + '%' ),
              this.percentc = ( String( this.userData1.rank.clarity * 100 / 5741 ) + '%' ),
              this.percentq = ( String( this.userData1.rank.quickness * 100 / 5741 ) + '%' )
          },
      () => {},
      () => console.log( "OK: user completed!" )
    );
  }

  onEdit(){
    this.edit=true;
  }

  onSave(){
    this.edit=false;
  }

  onCancel(){
    this.edit=false;
  }

}
