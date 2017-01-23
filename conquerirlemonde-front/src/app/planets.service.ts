import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import { FleetWebSocketService } from './fleetwebsocket.service';
import { KubernetesWebSocketService } from './kuberneteswebsocket.service';
import { Planet } from './planet';

@Injectable()
export class PlanetsService {

  planetsWithKubernetes: Subject<Planet[]>;

  planetsWithFleet: Subject<Planet[]>;

  constructor(private fleetWsService: FleetWebSocketService,private kubernetesWsService: KubernetesWebSocketService) {  }

  public initWebSocketKubernetes() {
    this.planetsWithKubernetes = <Subject<Planet[]>>this.kubernetesWsService.connect(environment.wsPlanetsKubernetes)
      .map((response: MessageEvent): Planet[] => {
        return JSON.parse(response.data);;
      });
  }

  public initWebSocketFleet() {
    this.planetsWithFleet = <Subject<Planet[]>>this.fleetWsService.connect(environment.wsPlanetsFleet)
      .map((response: MessageEvent): Planet[] => {
        return JSON.parse(response.data);;
      });
  }

}
