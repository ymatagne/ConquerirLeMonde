import { Component, ViewChild } from '@angular/core';
import { RulesComponent } from './rules/rules.component';
import { GamesComponent } from './games/games.component';
import { PlanetsComponent } from './planets/planets.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(GamesComponent) gamesComponent: GamesComponent;

  title = 'app works!';

  startGame(tab) {
    if (tab._selectedIndex === 2) {
      this.gamesComponent.startGame();
    }
  }

}
