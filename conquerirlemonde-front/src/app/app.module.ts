import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { GamesComponent } from './games/games.component';
import { PlanetsComponent } from './planets/planets.component';
import { Episode1Component } from './episode1/episode1.component';


export const routes: Routes = [
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
    Episode1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
