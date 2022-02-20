import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { GameModeComponent } from './components/game-mode/game-mode.component';
import { PracticeModeComponent } from './components/practice-mode/practice-mode.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SinglePlayerComponent } from './components/single-player/single-player.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

import { TestBed } from '@angular/core/testing';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QmasterComponent } from './components/qmaster/qmaster.component';

import { ReactiveFormsModule } from '@angular/forms';

import { User } from './models/user';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RegisterComponent,
    LoginComponent,
    MainPageComponent,
    GameModeComponent,
    PracticeModeComponent,
    NavbarComponent,
    SinglePlayerComponent
    UpdateUserComponent,
    StatisticsComponent,
    QmasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
