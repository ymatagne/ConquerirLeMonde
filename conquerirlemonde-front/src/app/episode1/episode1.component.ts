import { Component, OnInit } from '@angular/core';
import {IdentityService} from "../identity.service";

@Component({
  selector: 'app-episode1',
  templateUrl: './episode1.component.html',
  styleUrls: ['./episode1.component.css']
})
export class Episode1Component implements OnInit {

  options = ['Aws','Vagrant'];
  chosenOption: string = 'Aws';

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
