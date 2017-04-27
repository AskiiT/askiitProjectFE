import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  repass:boolean=false;
  term:string;
  term1:string;

  availableColors: Array<string>;
  colorSelected: string;

  constructor() { }

  signUpForm = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('[^0-9`!@#\$%\^&*+_=]+')]),
    lastName: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('[^0-9`!@#\$%\^&*+_=]+')]),
    email: new FormControl(),
    userName: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z][a-zA-Z0-9]+')]),
    password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)]),
    cpassword: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)]),
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

  isPass(){
    if (this.term == this.term1){
      this.repass = true;
    }else{
      this.repass = false;
    }
  }

}
