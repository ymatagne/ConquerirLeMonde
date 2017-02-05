import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { GamesComponent } from './games/games.component';
import { PlanetsComponent } from './planets/planets.component';
import { HomeComponent } from './home/home.component';
import { Episode1Component } from './episode1/episode1.component';
import { Episode2Component } from './episode2/episode2.component';
import { Episode3Component } from './episode3/episode3.component';
import { SettingsComponent } from './settings/settings.component';
import { SlidesComponent } from './slides/slides.component';
import {SafeUrlPipe} from "./slides/safe-url.pipe";
import { Episode5Component } from './episode5/episode5.component';
import { Episode6Component } from './episode6/episode6.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthenticationService} from "./auth/authentication.service";
import { Episode7Component } from './episode7/episode7.component';
import {IndentityComponent} from "./identity/identity.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'episode1', component: Episode1Component },
  { path: 'episode2', component: Episode2Component },
  { path: 'episode3', component: Episode3Component },
  { path: 'episode5', component: Episode5Component },
  { path: 'episode6', component: Episode6Component },
  { path: 'episode7', component: Episode7Component },
  { path: 'slides/:id', component: SlidesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    GamesComponent,
    PlanetsComponent,
    HomeComponent,
    Episode1Component,
    Episode2Component,
    Episode3Component,
    SettingsComponent,
    SlidesComponent,
    SafeUrlPipe,
    Episode5Component,
    Episode6Component,
    LoginComponent,
    Episode7Component,
    IndentityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
