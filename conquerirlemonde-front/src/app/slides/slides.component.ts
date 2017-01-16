import {Component, OnInit, Input} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
    });
    document.getElementsByTagName("iframe")[0].className = "fullScreen";
  }

  trustSrcUrl = function(data){
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

}
