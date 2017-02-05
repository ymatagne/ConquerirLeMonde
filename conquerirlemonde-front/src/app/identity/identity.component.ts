import {Component, OnInit} from '@angular/core';
import {IdentityService} from "../identity.service";
import {Planet} from "../planet";
import {Trooper} from "../trooper";

@Component({
  selector: 'identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IndentityComponent implements OnInit {

  planetAvailable = Planet.available;
  shipAvailable = Trooper.shipAvailable;

  constructor(private identityService: IdentityService) {
  }

  ngOnInit() {
  }

  save(){
    this.identityService.save();
  }

}
