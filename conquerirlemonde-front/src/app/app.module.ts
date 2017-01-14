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


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'episode1', component: Episode1Component },
  { path: 'episode2', component: Episode2Component },
  { path: 'episode3', component: Episode3Component }
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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
