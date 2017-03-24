import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RecaptchaModule } from 'ng2-recaptcha';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PromoComponent } from './promo/promo.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { BannerComponent } from './banner/banner.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SearchComponent } from './search/search.component';
import { WallComponent } from './wall/wall.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatsComponent } from './chats/chats.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: LandingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PromoComponent,
    SignInComponent,
    SignUpComponent,
    BannerComponent,
    NavigatorComponent,
    SearchComponent,
    WallComponent,
    ProfileComponent,
    ChatsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( appRoutes ),
    MaterialModule.forRoot( ),
    RecaptchaModule.forRoot( )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
