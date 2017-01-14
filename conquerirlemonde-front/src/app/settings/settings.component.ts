import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  srcPlanetImg = 'ko';

  srcShipImg = 'enemy';

  planets = ['alderaan', 'bespin', 'coruscant', 'dagobah', 'endor', 'hoth', 'jakku', 'kashyyyk', 'mandalore', 'naboo', 'tatooine', 'yavin']
  ships = ['enemy', 'ship']

  constructor() { }

  ngOnInit() {
  }

  showPlanet(planet) {
    this.srcPlanetImg = planet;
  }

  showShip(ship) {
    this.srcShipImg = ship;
  }

}
