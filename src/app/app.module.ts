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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PromoComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot( )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
