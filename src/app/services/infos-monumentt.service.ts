import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class InfosMonumenttService {

  private _url:string='./assets/infos.json';

  constructor(private http : Http) { }

  getInfoMonument(){
    return this.http.get(this._url)
    .map( (response: Response) => {
      const data = response.json();
      return data;
   });
  }

}
