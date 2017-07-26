import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'formulario_final',
  templateUrl: 'formulario_final.html'
})

export class FormularioCadastroPage {
    produto : Produto;
    public _mensagem : Alert;
    myColor: string = 'search-buttom';
    isRound: boolean = false;

    constructor(public parametro : NavParams ,
      public _navController: NavController,
      public _http: Http,
      public _alert : AlertController){

        this._mensagem = _alert.create({
          title: 'Aviso',
          buttons : [{text : 'Ok', handler : () => this._navController.setRoot(HomePage)}]
        })

    }

    salvar(){
      this.produto = this.parametro.get('produtoSalvar');
      console.log(this.produto);

      let api = 'http://localhost:3010/salvar';

      this._http.post(api, this.produto).toPromise().then(elemento => {
          this._mensagem.setSubTitle('Produto cadastrado com sucesso');
          this._mensagem.present();
      }).catch (erro => {
          this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
          this._mensagem.present();
          console.log(erro);
      });
    }
}

