import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { InfosMonumenttService } from "../services/infos-monumentt.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private translate: TranslateService,private info:InfosMonumenttService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
    info.updateLangue('fr');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      console.log("langue après update appnavigation",event.lang);
      info.updateLangue(event.lang);
    });
   }

  ngOnInit() {
  }
  setLanguage(lang:string){
    this.translate.use(lang);
  }

}
