import { Component, OnInit } from '@angular/core';
import { IdentityService } from "../identity.service";

@Component({
  selector: 'app-episode6',
  templateUrl: './episode6.component.html',
  styleUrls: ['./episode6.component.scss']
})
export class Episode6Component implements OnInit {
  displayLine1 = false;
  displayLine2 = false;
  displayLine3 = false;
  displayLine4 = false;
  displayLine5 = false;
  displayLine6 = false;
  displayLine7 = false;
  displayLine8 = false;
  constructor(public identityService: IdentityService) { }

  ngOnInit() {
  }

}
