import { Component, OnInit } from '@angular/core';


import { Planet } from '../planet';
import { PlanetsService } from '../planets.service';
import { WebSocketService } from '../websocket.service';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [PlanetsService, WebSocketService]
})
export class PlanetsComponent implements OnInit {
  options = ['Fleet', 'Kubernetes'];
  chosenOption: string = 'Fleet';

  planets: Planet[] = new Array();

  constructor(private planetsService: PlanetsService) { }

  ngOnInit() {
    switch (this.chosenOption) {
      case 'Fleet':
        this.planetsService.initWebSocketFleet();
        this.planetsService.planetsWithFleet.subscribe(planets => {
          this.planets = planets;
        });
        break;
      case 'Kubernetes':
        this.planetsService.initWebSocketKubernetes();
        this.planetsService.planetsWithKubernetes.subscribe(planets => {
          this.planets = planets;
        });
        break;
    }
  }
}
