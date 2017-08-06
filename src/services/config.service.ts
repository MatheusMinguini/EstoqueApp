export class Configuracao {
  public _API : string;

  constructor(){
    this._API = /*'http://localhost:3010'*/ 'http://procurala.kinghost.net:21035';
  }

  getAdressAPI() : String{
    return this._API;
  }
}
