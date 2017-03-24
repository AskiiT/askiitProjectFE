import { Component, OnInit } from '@angular/core';
//import { LandingService } from './landing/landing.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public title = 'AskiiT';
  public sign = true;
  public siteHome = false;

  constructor() { }

  ngOnInit() {
  }

  buttonSignIn(){
    this.sign = true;
  }

  buttonSignUp(){
    this.sign = false;
  }

}
