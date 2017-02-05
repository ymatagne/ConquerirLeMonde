import { Component, OnInit } from '@angular/core';
import {IdentityService} from "../identity.service";

@Component({
  selector: 'app-episode3',
  templateUrl: './episode3.component.html',
  styleUrls: ['./episode3.component.scss']
})
export class Episode3Component implements OnInit {

  options = ['Aws','Vagrant'];
  chosenOption: string = 'Aws';

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
