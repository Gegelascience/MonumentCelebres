import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil/accueil.component';
import { PageNotFoundComponent } from './error404/page-not-found/page-not-found.component';
import { MonumentComponent } from './monument/monument.component';

import {InfosMonumenttService} from './services/infos-monumentt.service'


const appRoutes: Routes = [
  {path:'accueil', component: AccueilComponent},
  {path: 'monument/:name/:cam', component: MonumentComponent },
  { path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PageNotFoundComponent,
    MonumentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [InfosMonumenttService],
  bootstrap: [AppComponent]
})
export class AppModule { }
