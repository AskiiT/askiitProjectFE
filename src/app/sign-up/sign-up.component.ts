import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  availableColors: Array<string>;
  colorSelected: string;

  constructor() { }

  signUpForm = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    cpassword: new FormControl(),
    color: new FormControl()
  });

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

  updateColor( c ) {
      this.colorSelected = c;
  }

  resolved( captchaResponse: string ) {
        console.log('Resolved captcha with response ${captchaResponse}:');
  }

  onSubmit(){
    console.log(this.signUpForm.value);
  }

}
