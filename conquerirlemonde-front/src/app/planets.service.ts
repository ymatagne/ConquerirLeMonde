import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import { WebSocketService } from './websocket.service';
import { Planet } from './planet';

@Injectable()
export class PlanetsService {

  planets: Subject<Planet[]>;

  constructor(private wsService: WebSocketService) {
    this.planets = <Subject<Planet[]>>wsService.connect(environment.planetsUrls)
      .map((response: MessageEvent): Planet[] => {
        return JSON.parse(response.data);;
      });
  }

}
