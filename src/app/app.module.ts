import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RecaptchaModule } from 'ng2-recaptcha';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { ReactiveFormsModule } from '@angular/forms';

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
import { TagFilterPipe } from './tag-filter.pipe';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { ChatFilterPipe } from './chat-filter.pipe';
import { QuestionComponent } from './question/question.component';
import { TopicFilterPipe } from './topic-filter.pipe';
import { AskiitComponent } from './askiit/askiit.component';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

import { Angular2TokenService } from 'angular2-token';
import { AuthService } from "./auth.service";

import { AuthGuard } from "./guards/auth.guards";
import { LoggedGuard } from "./guards/logged.guard";
import { NotificationsComponent } from './notifications/notifications.component';
import { ReportComponent } from './report/report.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyQuestionComponent } from './my-question/my-question.component';

export const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        component: WallComponent,
      },
      {
        path: 'profile/:user',
        component: ProfileComponent,
      },
      {
        path: 'questions',
        component: MyQuestionsComponent,
      },
      {
        path: 'myProfile',
        component: MyProfileComponent,
      },
    ]
  },
  { path: '',
    component: LandingComponent,
    canActivate: [ LoggedGuard ],
    children: [
      { path: '',
        component: SignInComponent,
      },
      { path: 'sign-up',
        component: SignUpComponent,
      },
    ]
  },
  {
    path: 'contact',
    component: ContactComponent
  }
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
    ContactComponent,
    ChatFilterPipe,
    TagFilterPipe,
    QuestionComponent,
    TopicFilterPipe,
    AskiitComponent,
    NotificationsComponent,
    ReportComponent,
    MyProfileComponent,
    MyQuestionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( appRoutes ),
    MaterialModule.forRoot( ),
    RecaptchaModule.forRoot( ),
    Ng2FilterPipeModule,
    VirtualScrollModule,
    NgReduxModule
  ],
  entryComponents: [
    AskiitComponent,
    NotificationsComponent,
    ReportComponent
  ],
  providers: [ Angular2TokenService, AuthService, AuthGuard, LoggedGuard ],
  bootstrap: [AppComponent]
})

export class AppModule {
    constructor( ngRedux: NgRedux<IAppState> ) {
        ngRedux.configureStore( rootReducer, INITIAL_STATE );
    }
}
