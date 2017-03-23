import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AskiiT';
  sign = false;

  buttonSignIn(){
    this.sign = true;
  }
  buttonSignUp(){
    this.sign = false;
  }


}
