import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController, AlertController, Alert, NavParams } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { Http } from '@angular/http';
import { ResultadoPage } from '../resultado/resultado';

@Component({
  selector: 'pesquisa',
  templateUrl: 'pesquisa.html'
})

export class PesquisaPage{
  public nome : String;
  public descricao : String;
  public preco : number;
  public cor : String;
  public tamanho : String;
  public grupo : Grupo;

  public _mensagem : Alert;

  produtos: Produto[] = [];

  myColor: string = 'search-buttom';
  isRound: boolean = false;

  constructor( public _http: Http, public navCtrl: NavController ){

  }

  pesquisar(){
  //let produto = new Produto (this.nome, this.descricao, this.preco, this.cor, this.tamanho, this.grupo);

  let api = 'http://localhost:3010/filtrar';

  // this._http.post(api, produto)
  //   .map(resp => resp.json())
  //     .toPromise().then(elemento => {
  //     this.produtos = elemento;
  //     this.navCtrl.push(ResultadoPage, { produtosEncontrados: this.produtos});
  // }).catch (erro => {
  //     this.navCtrl.push(ResultadoPage, { produtosEncontrados: this.produtos});
  //     console.log(erro);
  // });
}
}


