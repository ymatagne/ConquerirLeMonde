import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import { WebSocketService } from './websocket.service';
import { Planet } from './planet';

@Injectable()
export class PlanetsService {

  planetsWithKubernetes: Subject<Planet[]>;

  planetsWithFleet: Subject<Planet[]>;

  constructor(private wsService: WebSocketService) {  }

  public initWebSocketKubernetes() {
    this.planetsWithKubernetes = <Subject<Planet[]>>this.wsService.connect(environment.wsPlanetsKubernetes)
      .map((response: MessageEvent): Planet[] => {
        return JSON.parse(response.data);;
      });
  }

  public initWebSocketFleet() {
    this.planetsWithFleet = <Subject<Planet[]>>this.wsService.connect(environment.wsPlanetsFleet)
      .map((response: MessageEvent): Planet[] => {
        return JSON.parse(response.data);;
      });
  }

}
