import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ UserService ]
})
export class SignUpComponent implements OnInit {
  repass:boolean=false;
  term:string;
  term1:string;
  us:string;
  em:string;
  ail:string;

  allUsers: any;
  allUmails:any;
  response$;
  response1$;
  gotResponse: boolean = true;
  gotResponseE: boolean = true;

  availableColors: Array<string>;
  colorSelected: string;

  constructor( private uService: UserService ) {  }

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

  subscribeData( us) {
    this.response$ = this.uService.getUserByUsername( us );

    this.response$.subscribe(
      res => { this.allUsers = res, this.gotResponse = true },
      () => {},
      () => console.log( "OK: users match completed!" )
    );

  }

  subscribeData1(em){
    this.response1$ = this.uService.getUsersByMail( em );
    this.response1$.subscribe(
      res => { this.allUmails = res, this.gotResponse = true },
      () => {},
      () => console.log( "OK: users match completed!" )
    );
  }


  checkForEmptyResponseE( em ) {
      if ( em === '' )
          return false;
      if ( this.allUmails instanceof Array )
          return true;
      return false;
  }

  inputChangeE( em ){
    if ( em != '' && em != undefined) {
      this.gotResponseE = false;
      var re = /[.]/;
      var newstr = em.replace(re, '*');
      console.log( newstr )
      this.subscribeData1(newstr);
    }
  }

  checkForEmptyResponse( us ) {
      if ( us === '' )
          return false;
      if ( this.allUsers instanceof Array )
          return true;
      return false;
  }

  inputChange( us ){
      if ( us != '' ) {
          this.gotResponse = false;
          this.subscribeData(us);
      }
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
