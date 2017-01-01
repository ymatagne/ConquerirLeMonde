import { Component } from '@angular/core';

declare var Game: any;

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  game: any;

  constructor() {}

  startGame() {
    this.game = new Game();
    this.game.init();
  }

}
