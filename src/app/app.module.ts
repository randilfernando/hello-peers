import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {VideoService} from './services/video.service';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ChatComponent} from './pages/chat/chat.component';
import {HomeComponent} from './pages/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {ChatService} from "./services/chat.service";
import {PeerService} from "./services/peer.service";
import {FormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'chat', component: ChatComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [
    VideoService,
    ChatService,
    PeerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
