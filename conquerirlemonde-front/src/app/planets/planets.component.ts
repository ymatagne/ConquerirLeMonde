import { Component, OnInit } from '@angular/core';


import { Planet } from '../planet';
import { PlanetsService } from '../planets.service';
import { FleetWebSocketService } from '../fleetwebsocket.service';
import { KubernetesWebSocketService } from '../kuberneteswebsocket.service';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [PlanetsService, KubernetesWebSocketService,FleetWebSocketService]
})
export class PlanetsComponent implements OnInit {
  options = ['Fleet', 'Kubernetes'];
  chosenOption: string = 'Fleet';

  fleetPlanets: Planet[] = new Array();
  kubernetesPlanets: Planet[] = new Array();

  constructor(private planetsService: PlanetsService) { }

  updateBrokenImage(event) {
    event.srcElement.src = "/assets/planets/ko.png";
  }

  ngOnInit() {
    this.planetsService.initWebSocketFleet();
    this.planetsService.planetsWithFleet.subscribe(planets => {
      this.fleetPlanets = planets;
    });
    this.planetsService.initWebSocketKubernetes();
    this.planetsService.planetsWithKubernetes.subscribe(planets => {
      this.kubernetesPlanets = planets;
    });
  }
}
