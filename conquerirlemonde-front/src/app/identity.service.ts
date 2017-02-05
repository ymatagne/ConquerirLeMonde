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
      this.identity.masterIp = environment.masterIp;
      this.identity.masterPort = environment.masterPort;
      this.save();
    }
  }

}
