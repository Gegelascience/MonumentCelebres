import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil/accueil.component';
import { PageNotFoundComponent } from './error404/page-not-found/page-not-found.component';
import { MonumentComponent } from './monument/monument.component';

import {InfosMonumenttService} from './services/infos-monumentt.service'
import { D3Service } from 'd3-ng2-service';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NavigationComponent } from './navigation/navigation.component';

import { AgGridModule } from 'ag-grid-angular';

import {RouteModule} from './route/route.module';



@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PageNotFoundComponent,
    MonumentComponent,
    StatistiquesComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouteModule,
    AgGridModule.withComponents([])
  ],
  providers: [InfosMonumenttService,D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
