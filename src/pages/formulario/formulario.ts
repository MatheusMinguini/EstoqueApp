import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Produto } from '../../models/Produto';
import { FormularioCadastroPage } from '../formulario/formulario_final';

@Component({
    selector : 'formulario',
    templateUrl : 'formulario.html'
})

export class FormularioPage{
  public nome : String;
  public descricao : String;
  public preco : number;
  public cor : String;
  public tamanho : String;
  public _mensagem : Alert;

  myColor: string = 'search-buttom';
  isRound: boolean = false;


  constructor(public parametro : NavParams ,
      public _navController: NavController,
      public _http: Http,
      public _alert : AlertController){

      this._mensagem = _alert.create({
          title : 'Aviso',
          buttons : [{text : 'Ok', handler : () => this._navController.setRoot(HomePage)}]
      })
  }

  continuar(){

    let produto = new Produto (this.nome, this.descricao, this.preco, this.cor, this.tamanho);

    if(produto.verificarCamposObrigatorios(produto)){
      this._navController.push(FormularioCadastroPage,  { produtoSalvar: produto});
    }else{
        this._alert.create({
            title : 'Campos obrigatórios',
            subTitle : 'Por favor, preencha todos os campos',
            buttons : [{ text: 'Entendi'}]
        }).present();
    }
  }
}
