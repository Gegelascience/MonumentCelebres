import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Service pour récupérer les détails d'un monument
 */

@Injectable()
export class InfosMonumenttService {

  /**
   * url du fichier json
   */
  
  private _url:string='./assets/infos.json';

  /**
   * Constructeur important le module http
   */

  constructor(private http : Http) { }

  /**
   * Récupere les détails des monuments sous format json
   */

  getInfoMonument(){
    return this.http.get(this._url)
    .map( (response: Response) => {
      const data = response.json();
      return data;
   });
  }

}
