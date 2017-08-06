
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { FormularioCadastroPage } from '../formulario/formulario_final';
import { BarcodeScanner, BarcodeScannerOptions  } from '@ionic-native/barcode-scanner';


@Component({
  templateUrl: 'formulario_barCode.html'
})

export class BarCodeForm implements OnInit{

  configuracao: BarcodeScannerOptions; 
  myColor: string;
  isRound: boolean;
  textoBotao : string;
  produto : Produto;
  result : any;

  constructor(private barcodeScanner: BarcodeScanner, 
    public _parametro : NavParams, 
    public _navController : NavController,
    public _AlertController: AlertController ){

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

  lerCodigoBarras(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.result = barcodeData;
      this.textoBotao = 'Prosseguir';
      this.produto.codigo_barras = this.result.text;
    }, (err) => {
      this._AlertController.create({
        title: 'Aviso',
        buttons: [{text: 'Entendi'}],
        subTitle: 'Ocorreu algum problema ao ler o Código de barras'
      }).present();
    });
  }

}
