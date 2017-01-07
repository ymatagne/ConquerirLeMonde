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
import { Episode1Component } from './episode1/episode1.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'episode1', component: Episode1Component }
];


@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    GamesComponent,
    PlanetsComponent,
    Episode1Component,
    HomeComponent
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
