import { Component, ViewChild } from '@angular/core';
import { RulesComponent } from './rules/rules.component';
import { GamesComponent } from './games/games.component';
import { PlanetsComponent } from './planets/planets.component';
import { Router } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router, private guard : AuthGuard ) {
    this.router = router;
    this.guard = guard;
  }

  public selectedIndex() {
    switch (this.router.url) {
      case '/settings': return 1;
      case (this.router.url.match(/\/rules|\/episode.*/) || {})[0]: return 2;
      case '/planets': return 3;
      case '/games': return 4;
      default: return 0;
    }
  }

  public changeTab(e) {
    switch (e.index) {
      case 0:
        this.router.navigateByUrl('');
        break;
      case 1:
        this.router.navigateByUrl('/settings');
        break;
      case 2:
        this.router.navigateByUrl('/rules');
        break;
      case 3:
        this.router.navigateByUrl('/planets');
        break;
      case 4:
        this.router.navigateByUrl('/games');
        break;
      default:
        break;
    }
  }
}
