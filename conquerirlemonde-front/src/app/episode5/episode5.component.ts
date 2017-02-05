import { Component, OnInit } from '@angular/core';
import {IdentityService} from "../identity.service";

@Component({
  selector: 'app-episode5',
  templateUrl: './episode5.component.html',
  styleUrls: ['./episode5.component.scss']
})
export class Episode5Component implements OnInit {

  options = ['Aws','Vagrant'];
  chosenOption: string = 'Aws';

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

}
