import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Planet } from './planet';

@Injectable()
export class PlanetsService {

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private planetsUrls = '/app/planets';  // URL to web api

  getPlanets(): Promise<Planet[]> {
    return this.http.get(this.planetsUrls)
      .toPromise()
      .then(response => response.json().data as Planet[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
