import { Grupo } from '../models/Grupo';

export class Produto{
  nome : String;
  descricao: String;
  preco : number;
  cor : String;
  tamanho : String;
  grupo : number;
  genero: string;

  constructor(){

  }


  verificarCamposObrigatorios(objeto){
        if(!objeto.nome || !objeto.descricao || !objeto.preco || !objeto.cor || !objeto.tamanho){
            return false;
        }else{
            return true;
        }
    }
}
