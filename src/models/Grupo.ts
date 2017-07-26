import { Http } from '@angular/http';

export class Grupo{

  id : number;
  nome: string;


  constructor(id: number, nome: string, public _http: Http){
    this.id = id;
    this.nome = nome;
  }


}
