import { Component, OnInit } from '@angular/core';


import { Planet } from '../planet';
import { PlanetsService } from '../planets.service';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [PlanetsService]
})
export class PlanetsComponent implements OnInit {

  planets: Planet[];

  constructor(private planetsService: PlanetsService) { }

  getPlanets(): void {
    this.planetsService.getPlanets().then(planets => this.planets = planets);
  };

  ngOnInit() {
    this.getPlanets();
  }

}
