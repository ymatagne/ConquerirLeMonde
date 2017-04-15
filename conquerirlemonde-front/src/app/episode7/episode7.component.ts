import { Component, OnInit } from '@angular/core';
import { IdentityService } from "../identity.service";

@Component({
  selector: 'app-episode7',
  templateUrl: './episode7.component.html',
  styleUrls: ['./episode7.component.scss']
})
export class Episode7Component implements OnInit {

  displayLine1 = false;
  displayLine2 = false;
  displayLine3 = false;
  displayLine4 = false;
  displayLine5 = false;
  displayLine6 = false;
  displayLine7 = false;
  displayLine8 = false;
  displayLine9 = false;
  displayLine10 = false;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
