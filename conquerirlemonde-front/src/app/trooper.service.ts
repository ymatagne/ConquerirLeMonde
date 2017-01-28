import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
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

  public dropTrooper(trooper: Trooper): Promise<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.dropTrooperUrl, trooper, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.toString()
      if(body){
        console.log('Trooper is dead')
        return true;
      }
      return false;
  }

  private handleError (error: Response | any) {
    console.error('Unable to kill trooper : .' + error);
    return false;
  }

}
