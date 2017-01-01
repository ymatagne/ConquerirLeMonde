import { Component, OnInit } from '@angular/core';


import { Planet } from '../planet';
import { PlanetsService } from '../planets.service';
import {WebSocketService} from '../websocket.service';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [PlanetsService,WebSocketService]
})
export class PlanetsComponent {

  planets: Planet[]=new Array();
  ws:any;

  constructor(private planetsService: PlanetsService) { 
      planetsService.planets.subscribe(planets => {
            this.planets=planets;
        });
  }
}
