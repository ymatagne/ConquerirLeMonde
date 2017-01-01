import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { WebSocketService } from './websocket.service';
import { Planet } from './planet';

@Injectable()
export class PlanetsService {

  planets: Subject<Planet[]>;

  private planetsUrls = 'ws://localhost:8080/ws/planets';  // URL to web api

  constructor(private wsService: WebSocketService) {
    this.planets = <Subject<Planet[]>>wsService.connect(this.planetsUrls)
      .map((response: MessageEvent): Planet[] => {
        return JSON.parse(response.data);;
      });
  }

}
