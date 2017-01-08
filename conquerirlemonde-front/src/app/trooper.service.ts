import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import { WebSocketService } from './websocket.service';
import { Trooper } from './trooper';

@Injectable()
export class TrooperService {

  trooper: Subject<Trooper>;

  constructor(private wsService: WebSocketService, private http: Http) {
    this.trooper = <Subject<Trooper>>wsService.connect(environment.newTrooperUrl)
      .map((response: MessageEvent): Trooper => {
        return JSON.parse(response.data);;
      });
  }

  public dropTrooper(trooper: Trooper) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(environment.dropTrooperUrl, trooper, options).toPromise()
      .then(() => console.log('ok'))
      .catch(() => console.log('ko'));
  }

}
