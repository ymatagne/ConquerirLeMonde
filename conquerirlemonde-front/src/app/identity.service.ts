import {Injectable} from '@angular/core';

import { environment } from '../environments/environment';

import {Identity} from "./identity";

@Injectable()
export class IdentityService {

  public identity: Identity;

  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem('identity', JSON.stringify(this.identity));
  }

  load() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    if(!this.identity){
      this.identity = new Identity();
      this.identity.gameIp = environment.gameIp;
      this.identity.gamePort = environment.gamePort;
      this.identity.awsKey=environment.awsKey;
      this.save();
    }
  }

}
