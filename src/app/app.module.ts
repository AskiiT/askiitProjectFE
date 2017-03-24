import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RecaptchaModule } from 'ng2-recaptcha';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PromoComponent } from './promo/promo.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PromoComponent,
    SignInComponent,
    SignUpComponent,
    BannerComponent
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
