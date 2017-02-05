import {OnChanges, SimpleChange} from "@angular/core";
export class Identity {
    constructor(public pseudo = '', public masterIp ='',public yourIp='',public planet = 'alderaan', public spaceship = 'Corellian') { }
}
