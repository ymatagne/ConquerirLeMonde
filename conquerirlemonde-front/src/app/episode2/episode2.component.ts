import { Component, OnInit } from '@angular/core';
import { IdentityService } from "../identity.service";

@Component({
  selector: 'app-episode2',
  templateUrl: './episode2.component.html',
  styleUrls: ['./episode2.component.css']
})
export class Episode2Component implements OnInit {

  ships = ['Corellian', 'DroidStarFighter', 'JediStarFighter', 'MilleniumFalcon', 'NabooBomber', 'NabooStarFighter', 'RebublicCruiser', 'Tibirium', 'TieFighter', 'Xwing', 'YWing']
  options = ['Aws', 'Vagrant'];
  displayLine1 = false;
  displayLine2 = false;
  displayLine3 = false;
  displayLine4 = false;
  displayLine5 = false;
  displayLine6 = false;
  displayLine7 = false;
  displayLine8 = false;
  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
