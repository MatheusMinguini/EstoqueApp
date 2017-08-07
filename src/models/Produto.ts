export class Produto{
  codigo_barras: String;
  nome : String;
  descricao: String;
  preco : number;
  cor : String;
  tamanho : String;
  grupo_id : number;
  genero: string;
  data_cadastro: Date;
  img: string;

  constructor(){

  }

  verificarCamposObrigatorios(objeto){
    if(!objeto.nome || !objeto.descricao || !objeto.preco || !objeto.cor || !objeto.tamanho
      || !objeto.grupo_id || !objeto.genero){
        return false;
    }else{
        return true;
    }
  }

  verificarFiltros(objeto){
    if(!objeto.nome && !objeto.descricao && !objeto.preco && !objeto.cor && !objeto.tamanho
      && !objeto.grupo_id && !objeto.genero && !objeto.data_cadastro){
        return false;
    }else{
        return true;
    }
  }

}
