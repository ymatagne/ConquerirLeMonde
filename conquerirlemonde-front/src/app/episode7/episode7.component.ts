import { Component, OnInit } from '@angular/core';
import {IdentityService} from "../identity.service";

@Component({
  selector: 'app-episode7',
  templateUrl: './episode7.component.html',
  styleUrls: ['./episode7.component.scss']
})
export class Episode7Component implements OnInit {

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
