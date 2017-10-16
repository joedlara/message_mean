import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { WallService } from './wall/wall.service';
import { LoginService } from './login/login.service';
import { ShowService } from './show/show.service';

import { AppComponent } from './app.component';
import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    WallComponent,
    LoginComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
  ],
  providers: [WallService, LoginService, ShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }