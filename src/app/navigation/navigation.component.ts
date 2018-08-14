import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() language=new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  setLanguage(lang:string){
    this.language.emit(lang);
  }

}
