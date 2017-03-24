import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resolved( captchaResponse: string ) {
        console.log('Resolved captcha with response ${captchaResponse}:');
  }

}
