import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode3',
  templateUrl: './episode3.component.html',
  styleUrls: ['./episode3.component.scss']
})
export class Episode3Component implements OnInit {

  options = ['Aws','Vagrant'];
  chosenOption: string = 'Aws';

  constructor() { }

  ngOnInit() {
  }

}
