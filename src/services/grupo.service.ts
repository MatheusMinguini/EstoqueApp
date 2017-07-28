import { Http } from '@angular/http';
import { Grupo } from '../models/Grupo';

export class GrupoService {

    _API: string
    grupos : Array<Grupo>;

    constructor(/*public grupo : Grupo, public _http: Http*/){
        this._API = 'http://localhost:3010';
    }

    // buscarGrupos() : Array<Grupo>{
    //   this._http.get(this._API + '/grupos')
    //   .map(resp => resp.json())
    //   .toPromise()
    //   .then(elemento => {
    //     return this.grupos = elemento;
    //   }).catch (erro => {
    //       console.log(erro);
    //       return this.grupos =  null;
    //   });

    //   return null;
    // }
}
