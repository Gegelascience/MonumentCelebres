import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

/**
 * component de routage
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService){
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  onChangeLanguage(lang:string){
    this.translate.use(lang);
  }
}
