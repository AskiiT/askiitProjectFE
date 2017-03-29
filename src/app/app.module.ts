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
import { SignUpComponent } from './sign-up/sign-up.component';
import { BannerComponent } from './banner/banner.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SearchComponent } from './search/search.component';
import { WallComponent } from './wall/wall.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatsComponent } from './chats/chats.component';
import { HomeComponent } from './home/home.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WallComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'questions',
        component: MyQuestionsComponent,
      },
    ]
  },
  { path: '',
    component: LandingComponent,
    children: [
      { path: '',
        component: SignInComponent,
      },
      { path: 'sign-up',
        component: SignUpComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PromoComponent,
    SignInComponent,
    SignUpComponent,
    BannerComponent,
    NavigatorComponent,
    SearchComponent,
    WallComponent,
    ProfileComponent,
    ChatsComponent,
    LandingComponent,
    HomeComponent,
    ToolBarComponent,
    MyQuestionsComponent,
    ContactComponent
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
