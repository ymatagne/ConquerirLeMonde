import { Component, OnInit } from '@angular/core';
import {Planet} from "../planet";
import {Trooper} from "../trooper";
import {IdentityService} from "../identity.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  planets = Planet.available;
  ships = Trooper.shipAvailable;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

  showPlanet(planet) {
    this.identityService.identity.planet = planet;
  }

  showShip(ship) {
    this.identityService.identity.spaceship = ship;
  }

}
