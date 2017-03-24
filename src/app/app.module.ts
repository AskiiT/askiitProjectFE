import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PromoComponent } from './promo/promo.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { RecaptchaModule } from 'ng2-recaptcha';
import { MainViewComponent } from './main-view/main-view.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PromoComponent,
    SignInComponent,
    SignUpComponent,
    MainViewComponent,
    LeftNavComponent,
    RightBarComponent,
    ToolBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot( ),
    RecaptchaModule.forRoot( )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
