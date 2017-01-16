import {Pipe, PipeTransform} from "@angular/core";
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Pipe({ name: 'safe' })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
