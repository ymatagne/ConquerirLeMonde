import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../auth/auth.guard";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(private guard : AuthGuard ) {
    this.guard = guard;
  }

  ngOnInit() {
  }

}
