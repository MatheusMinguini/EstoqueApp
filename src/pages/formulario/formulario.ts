import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { FormularioCadastroPage } from '../formulario/formulario_final';

@Component({
    providers : [ GrupoService, Produto ],
    selector : 'formulario',
    templateUrl : 'formulario.html'
})

export class FormularioPage{

  public produto : Produto;

  public _mensagem : Alert;

  public grupos : Array<Grupo>;

  myColor: string;
  isRound: boolean;


  constructor(public _grupoService : GrupoService, public parametro : NavParams ,
      public _navController : NavController,
      public _alert : AlertController){

      this.produto = new Produto();

      this._mensagem = _alert.create({
          title : 'Aviso',
          buttons : [{text : 'Ok', handler : () => this._navController.setRoot(HomePage)}]
      })

      this.myColor = 'search-buttom';
      this.isRound = false;

      //this.grupos = this._grupoService.buscarGrupos();
  }

  continuar(){
    if(this.produto.verificarCamposObrigatorios(this.produto)){
      this._navController.push(FormularioCadastroPage,  { produtoSalvar: this.produto});
    }else{
        this._alert.create({
            title : 'Campos obrigatórios',
            subTitle : 'Por favor, preencha todos os campos',
            buttons : [{ text: 'Entendi'}]
        }).present();
    }
  }
}
