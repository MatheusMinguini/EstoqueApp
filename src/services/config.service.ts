export class Configuracao {
  public _API : string;

  constructor(){
    this._API = 'http://localhost:3010';
  }

  getAdressAPI() : String{
    return this._API;
  }
}
