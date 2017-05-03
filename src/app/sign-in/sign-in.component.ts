import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    signInUser = {
    email: '',
    password: ''
    };

    constructor( private authService: AuthService, private router: Router ) { }

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
                  console.log( 'Successfull log in.' );
                  this.router.navigate( ['/home'] );
              }
            },
            err => {
              alert( err );
            }
        );

    }

}
