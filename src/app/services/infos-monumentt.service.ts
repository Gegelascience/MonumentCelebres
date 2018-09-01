import { Injectable } from '@angular/core';
import { Http } from "@angular/http";


/**
 * Service pour récupérer les détails d'un monument
 */

@Injectable()
export class InfosMonumenttService {

  /**
   * url du fichier de traductions
   */
  
  private _url:string='./src/assets/data/infos';

  /**
   * format du fichier de traductions
   */
  private format:string=".json";

  /**
   * langue
   */
  private langue:string;

  /**
   * Constructeur important le module http
   */
  constructor(private http : Http) { }

  /**
   * Récupere les détails des monuments sous format json
   */
  getInfoMonument():any{
    return this.http.get(this._url+this.langue+this.format)
   };

   
   /**
    * Récupère la langue du site
    */
   getlangue():string{
     return this.langue;
   }

   /**
    * update la langue du site
    * @param lang langue
    */
   updateLangue(lang:string):void{
     this.langue=lang;
   }
}

