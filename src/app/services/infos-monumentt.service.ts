import { Injectable } from '@angular/core';
import { Http } from "@angular/http";


/**
 * Service pour récupérer les détails d'un monument
 */

@Injectable()
export class InfosMonumenttService {

  /**
   * url du fichier json
   */
  
  private _url:string='./src/assets/data/infos.json';

  /**
   * Constructeur important le module http
   */

  constructor(private http : Http) { }

  /**
   * Récupere les détails des monuments sous format json
   */

  getInfoMonument(){
    return this.http.get(this._url)
   };
}

