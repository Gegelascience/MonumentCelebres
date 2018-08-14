import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatistiquesComponent } from '../statistiques/statistiques.component';
import { AccueilComponent } from '../accueil/accueil/accueil.component';
import { PageNotFoundComponent } from '../error404/page-not-found/page-not-found.component';
import { MonumentComponent } from '../monument/monument.component';

const appRoutes: Routes = [
  {path:'accueil', component: AccueilComponent},
  {path:'stat',component:StatistiquesComponent},
  {path: 'monument/:name', component: MonumentComponent },
  { path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class RouteModule { }
