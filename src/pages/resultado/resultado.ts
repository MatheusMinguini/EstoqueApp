import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController, AlertController, Alert, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import { EscolhaPage } from '../escolha/escolha';
import { FormularioPage } from '../formulario/formulario';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { Produto } from '../../models/Produto'



@Component({
  templateUrl: 'resultado.html'
})
export class ResultadoPage implements OnInit{

  public _mensagem : Alert;
  public produtos : Produto[] = [];

  constructor(public navCtrl: NavController,
              private _http: Http,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController,
              public parametro : NavParams
              ) {

  }

  ngOnInit(){
      this.produtos = this.parametro.get('produtosEncontrados');
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

  remover(evento){
    let api = 'http://localhost:3010/remover';

    this._http.post(api, evento)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
           this._mensagem.setSubTitle('Evento removido');
           this._mensagem.present();
        }).catch (erro => {
            this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
            this._mensagem.present();
            console.log(erro);
        });
  }
}
