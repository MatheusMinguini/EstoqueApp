export class Produto{
  nome : String;
  descricao: String;
  preco : number;
  cor : String;
  tamanho : String;

  constructor(nome, descricao, preco, cor, tamanho){
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.cor = cor;
    this.tamanho = tamanho;
  }

  verificarCamposObrigatorios(objeto){
        if(!objeto.nome || !objeto.descricao || !objeto.preco || !objeto.cor || !objeto.tamanho){
            return false;
        }else{
            return true;
        }
    }
}
