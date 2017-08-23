import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController, AlertController, Alert, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import { EscolhaPage } from '../escolha/escolha';
import { FormularioPage } from '../formulario/formulario';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { Produto } from '../../models/Produto'
import { Configuracao } from '../../services/config.service';


@Component({
  providers: [Configuracao],
  templateUrl: 'resultado.html'
})
export class ResultadoPage implements OnInit{

  public _mensagem : Alert;
  public produtos : Produto[] = [];

  constructor(public navCtrl: NavController,
              private _http: Http,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController,
              public parametro : NavParams,
              public _configuracao : Configuracao) {

  }

  ngOnInit(){
     this.produtos = this.parametro.get('produtosEncontrados');

    this._mensagem = this._alertCtrl.create({
      title : 'Aviso',
      buttons : [{ text : "Tudo bem"}]
    });
  }

  seleciona(produto: Object){
    this.navCtrl.push(EscolhaPage, { produtoSelecionado: produto});
  }

  cadastra(){
    this.navCtrl.push(FormularioPage);
  }

  pesquisa(){
    this.navCtrl.push(PesquisaPage);
  }

  remover(produto){

    var index = this.produtos.indexOf(produto);
    this.produtos.splice(index, 1);

    this._http.post(this._configuracao.getAdressAPI() + '/remover', produto)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
           this._mensagem.setSubTitle('Produto removido');
           this._mensagem.present();
        }).catch (erro => {
            this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
            this._mensagem.present();
            console.log(erro);
        });
  }

  confirmarOperacao(objeto) {
    let alert = this._alertCtrl.create({
      title: 'Confirmar Operação',
      message: 'Você vendeu o produto e deseja excluí-lo?',
      buttons: [
        {
          text: 'Não excluir',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.remover(objeto);
          }
        }
      ]
    });
    alert.present();
  }
}
