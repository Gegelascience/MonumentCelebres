import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { InfosMonumenttService } from "./services/infos-monumentt.service";

/**
 * component de routage
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService,private info:InfosMonumenttService){
    translate.setDefaultLang('fr');
    translate.use('fr');
    info.updateLangue('fr');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      console.log("langue après update appcomponent",event.lang);
      info.updateLangue(event.lang);
    });
  }

  onChangeLanguage(lang:string){
    this.translate.use(lang);
  }

  
}
