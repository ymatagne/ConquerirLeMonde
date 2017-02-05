import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import { WebSocketService } from './websocket.service';
import { Trooper } from './trooper';

@Injectable()
export class TrooperCountService {

  nbTrooper: Subject<number>;

  constructor(private wsService: WebSocketService, private http: Http) {
    this.nbTrooper = <Subject<number>>wsService.connect(environment.countTrooperUrl)
      .map((response: MessageEvent): number => {
        return response.data;
      });
  }

}
