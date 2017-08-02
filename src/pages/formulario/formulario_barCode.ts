import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { FormularioCadastroPage } from '../formulario/formulario_final';


@Component({
  templateUrl: 'formulario_barCode.html'
})

export class BarCodeForm implements OnInit{

  myColor: string;
  isRound: boolean;
  textoBotao : string;
  produto : Produto;

  constructor(public _parametro : NavParams, public _navController : NavController){

  }

  ngOnInit(){
    this.produto = this._parametro.get('produtoSalvar');
    this.produto.data_cadastro = new Date();
    this.myColor = 'search-buttom';
    this.isRound = false;
    this.textoBotao = 'Pular etapa e continuar';
  }

   continuar(){
    this._navController.push(FormularioCadastroPage,  { produtoSalvar: this.produto});
  }
}
