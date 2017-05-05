import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  userUpdateResponse$
  edit:boolean=false;
  public usernameParam: String;
  firstName:string;

  profileForm = new FormGroup({
    first_name: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('[^0-9`!@#\$%\^&*+_=]+')]),
    last_name: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('[^0-9`!@#\$%\^&*+_=]+')]),
    body: new FormControl(null,[Validators.maxLength(500)]),
  });

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
    console.log(this.profileForm.value.first_name);

      if ( this.firstNameValid( )) {
        this.userUpdateResponse$ = this.uService.updateUser( this.profileForm.value.first_name);
        this.userUpdateResponse$.subscribe(
          res => {
              if ( res.status == 200 ){
                console.log( "OK: user updated!" )
              }
          },
          () => {},
          () => console.log( "OK: user u!" )
        );

    }
    this.firstName = '';
  }

  onCancel(){
    this.edit=false;
  }

  firstNameValid(){
    if ( this.firstName == '' )
      return false;
    return true;
  }

}
