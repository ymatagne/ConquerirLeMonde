import { Component, ViewChild } from '@angular/core';
import { RulesComponent } from './rules/rules.component';
import { GamesComponent } from './games/games.component';
import { PlanetsComponent } from './planets/planets.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    this.router = router;
  }

  public changeTab(e) {
    console.log(e);
    switch (e.index) {
      case 0:
        this.router.navigateByUrl('/rules');
        break;
      case 1:
        this.router.navigateByUrl('/planets');
        break;
      case 2:
        this.router.navigateByUrl('/games');
        break;

      default:
        console.log('e is: ', e, 'e.index is: ', e.index);
        break;
    }
  }
}
