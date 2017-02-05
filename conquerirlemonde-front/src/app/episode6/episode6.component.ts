import { Component, OnInit } from '@angular/core';
import {IdentityService} from "../identity.service";

@Component({
  selector: 'app-episode6',
  templateUrl: './episode6.component.html',
  styleUrls: ['./episode6.component.scss']
})
export class Episode6Component implements OnInit {

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
