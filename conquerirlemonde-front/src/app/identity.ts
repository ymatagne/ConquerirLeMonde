import {OnChanges, SimpleChange} from "@angular/core";
export class Identity {
    constructor(public pseudo = '', public masterIp ='', public masterPort ='',public yourIp='', public nodePort='32201', public planet = 'alderaan', public spaceship = 'Corellian') { }
}
