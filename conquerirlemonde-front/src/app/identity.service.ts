import {Injectable, OnChanges, SimpleChange} from '@angular/core';
import { Observable } from 'rxjs/Rx';


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
      this.save();
    }
  }

}
