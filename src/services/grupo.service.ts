import { Http } from '@angular/http';
import { Grupo } from '../models/Grupo';
import { Injectable } from '@angular/core';
import { Configuracao } from '../services/config.service';

@Injectable()
export class GrupoService {

    grupos : Array<Grupo>;

    constructor(public _http: Http, public _configuracao: Configuracao,){

    }

    buscarGrupos(){
      return this._http.get(this._configuracao.getAdressAPI()  + '/grupos')
        .map(resp => resp.json())
          .toPromise();

    }

    buscarGruposInserir(genero){
      return this._http.get(this._configuracao.getAdressAPI()  + '/gruposInserir?genero=' + genero)
        .map(resp => resp.json())
          .toPromise();

    }
}
