export class Produto{
  nome : String;
  descricao: String;
  preco : number;
  cor : String;
  tamanho : String;
  grupo : number;
  genero: string;
  data_cadastro: Date;
  img: string;

  constructor(){

  }

    verificarCamposObrigatorios(objeto){
        if(!objeto.nome || !objeto.descricao || !objeto.preco || !objeto.cor || !objeto.tamanho
         /* || !objeto.grupo*/ || !objeto.genero){
            return false;
        }else{
            return true;
        }
    }

    verificarPreenchimento(objeto){
        if(objeto.nome || objeto.descricao || objeto.preco || objeto.cor || objeto.tamanho
         /* || !objeto.grupo*/ || objeto.genero){
            return true;
        }else{
            return false;
        }
    }
}
