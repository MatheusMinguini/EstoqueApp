
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
  result : Object;

  constructor(private barcodeScanner: BarcodeScanner, 
    public _parametro : NavParams, 
    public _navController : NavController){

  }

  ngOnInit(){
    this.produto = this._parametro.get('produtoSalvar');
    this.produto.data_cadastro = new Date();
    this.myColor = 'search-buttom';
    this.isRound = false;
    this.textoBotao = 'Pular etapa e continuar';
    console.log(this.produto.codigo_barra);
  }

  continuar(){
    this._navController.push(FormularioCadastroPage,  { produtoSalvar: this.produto});
  }

  lerCodigoBarras(){
    alert("test");
    this.barcodeScanner.scan().then((barcodeData) => {
      this.result = barcodeData;
      this.textoBotao = 'Prosseguir';
      //this.produto.codigo_barra = this.result.text;
    }, (err) => {
      
    });
  }

}
