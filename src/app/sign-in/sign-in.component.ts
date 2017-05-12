import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import {style, state, animate, transition, trigger} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
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
export class SignInComponent implements OnInit {

    signInUser = {
    email: '',
    password: ''
    };

    invalidCredentials = false;


    signInForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)]),
    });


    constructor( private authService: AuthService, private uService: UserService, private router: Router ) { }

    ngOnInit() {
    }

    resolved( captchaResponse: string ) {
        console.log('Resolved captcha with response ${captchaResponse}:');
    }

    onSignInSubmit( email, password ) {

        this.signInUser.email = email;
        this.signInUser.password = password;

        this.authService.logInUser( this.signInUser ).subscribe(
            res => {
              if( res.status == 200 ){

                  this.uService.logInToFirebase( this.signInUser );

                  console.log( 'Successfull log in.' );
                  this.invalidCredentials = false;
                  this.router.navigate( ['/home'] );
              }
            },
            err => {
              this.invalidCredentials = true;
            }
        );

    }

}
