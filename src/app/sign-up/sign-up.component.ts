import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { style, state, animate, transition, trigger } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ UserService ],
  animations: [
      trigger('fadeInOut', [
          transition(':enter', [
            style({opacity:0}),
            animate(200, style({opacity:1}))
          ]),
          transition(':leave', [
            animate(200, style({opacity:0}))
          ])
      ])
  ]
})
export class SignUpComponent implements OnInit {
  repass:boolean=false;
  term:string;
  term1:string;
  username:string = '';
  em:string = '';
  ail:string;

  allUsers: any;
  allUmails:any;

  response$;
  response1$;
  userPostResponse$;

  gotUsernameResponse: boolean = true;
  gotEmailResponse: boolean = true;

  availableColors: Array<string>;
  colorSelected: string;

  catchedEm: string = '';
  _timeout: any = null;

  catchedUn: string = '';
  _secondTimeout: any = null;

  signUpForm = new FormGroup({
    first_name: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('[^0-9`!@#\$%\^&*+_=]+')]),
    last_name: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('[^0-9`!@#\$%\^&*+_=]+')]),
    email: new FormControl(),
    username: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z][a-zA-Z0-9]+')]),
    password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)]),
  });

  constructor( private uService: UserService, private authService: AuthService, private router: Router,
    public lc: NgZone ) { }

  ngOnInit() {
      this.availableColors = [
          "#E73434",
          "#FFAA2A",
          "#B0E940",
          "#16E978",
          "#25C8F1",
          "#616FD5",
          "#C373BB",
          "#33335C",
          "#03461D",
          "#460337"
      ];

      this.colorSelected = '#ffffff';
  }

  subscribeUsernameData( us ) {
    this.response$ = this.uService.getUserByUsername( us );

    this.response$.subscribe(
      res => { this.allUsers = res, this.gotUsernameResponse = true },
      () => {},
      () => console.log( "OK: users match completed!" )
    );

  }

  subscribeEmailData( em ) {
    this.response1$ = this.uService.getUsersByMail( em );
    this.response1$.subscribe(
      res => { this.allUmails = res, this.gotEmailResponse = true },
      () => {},
      () => console.log( "OK: email match completed!" )
    );
  }

  checkForEmailEmptyResponse( ) {
      if ( this.em === '' )
          return false;
      if ( this.allUmails instanceof Array )
          return true;
      return false;
  }

  inputChangeE( ){

    if( this._timeout != null ) {
        window.clearTimeout( this._timeout );
    }

    this._timeout = window.setTimeout( () => {
        this._timeout = null;
        this.lc.run( () => this.catchedEm = this.em );
        if ( this.catchedEm.search( ' ' ) == -1 && this.catchedEm != '' )
        {
            var re = /[.]/gi;
            var newstr = this.catchedEm.replace( re, '*' );
            this.subscribeEmailData( newstr );
        }
    }, 600 );

  }

  checkForUsernameValidEmptyResponse( ) {
      if ( this.username === '' )
          return false;
      if ( !( this.allUsers instanceof Array ) )
          return true;
      return false;
  }

  checkForUsernameInvalidEmptyResponse( ) {
      if ( this.username === '' )
          return false;
      if ( this.allUsers instanceof Array )
          return true;
      return false;
  }

  updateColor( c ) {
      this.colorSelected = c;
  }

  resolved( captchaResponse: string ) {
        console.log('Resolved captcha with response ${captchaResponse}:');
  }

  onSubmit( ) {
      if ( this.term == this.term1 && this.checkForUsernameValidEmptyResponse( )
        && !this.checkForEmailEmptyResponse( ) ) {

        this.userPostResponse$ = this.uService.postUser( this.signUpForm.value, this.colorSelected );

        this.userPostResponse$.subscribe(
          res => {
              if ( res.status == 200 )
              {
                  this.uService.postUserToFirebase( this.signUpForm.value );

                  this.authService.logInUser( { email: this.signUpForm.value.email,
                      password: this.signUpForm.value.password } ).subscribe(
                          res => {
                            if( res.status == 200 ){
                                console.log( 'Successfull log in.' );
                                this.router.navigate( ['/home'] );
                            }
                          },
                          err => {
                            alert( err );
                          }
                      );

              }
          },
          () => {},
          () => console.log( "OK: user posted!" )
        );
    }
  }

  isPass( ) {
      if ( this.term == '' || this.term1 == '' )
        return false;
      if ( this.term == this.term1 )
        return false;
      return true;
  }

  checkExistingUsername( username ) {
    if( !this.signUpForm.controls['username'].hasError('minlength') )
    {
        if( this._secondTimeout != null ) {
            window.clearTimeout( this._secondTimeout );
        }

        this._secondTimeout = window.setTimeout( () => {
            this._secondTimeout = null;
            this.lc.run( () => this.catchedUn = username );
            if ( this.catchedUn.search( ' ' ) == -1 && this.catchedUn != '' )
            {
                this.subscribeUsernameData( this.catchedUn );
            }
        }, 600 );
    }
  }

}
