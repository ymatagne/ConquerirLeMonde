import { Component, OnInit } from '@angular/core';
import {TrooperService} from "../trooper.service";
import {WebSocketService} from "../websocket.service";
import {TrooperCountService} from "../trooperCount.service";

@Component({
  selector: 'app-episode8',
  templateUrl: './episode8.component.html',
  styleUrls: ['./episode8.component.scss'],
  providers: [TrooperCountService, WebSocketService]
})
export class Episode8Component implements OnInit {
  count = 0;

  constructor(private trooperService: TrooperCountService) {
    trooperService.nbTrooper.subscribe(count => {
      this.count = count;
    });
  }

  ngOnInit() {
  }

}
