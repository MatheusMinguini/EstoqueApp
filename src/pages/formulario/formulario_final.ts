import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Produto } from '../../models/Produto';
import { Configuracao } from '../../services/config.service';
import { Camera } from 'ionic-native';

@Component({
  providers: [ Configuracao ],
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
      public _alert : AlertController, public _configuracao: Configuracao){



    }

    ngOnInit() {
      this.produto = this.parametro.get('produtoSalvar');

      this._mensagem = this._alert.create({
          title: 'Aviso',
          buttons : [{text : 'Ok', handler : () => this._navController.setRoot(HomePage)}]
        })
    }

    salvar(){

      this._http.post(this._configuracao.getAdressAPI() + '/salvar', this.produto)
        .toPromise().then(elemento => {
          this._mensagem.setSubTitle('Produto cadastrado com sucesso');
          this._mensagem.present();
      }).catch (erro => {
          this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
          this._mensagem.present();
          console.log(erro);
      });
    }

    private abrirGaleria (): void {
      this.produto.img = 'assets/img/blusa.png';
      // let cameraOptions = {
      //   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      //   destinationType: Camera.DestinationType./*DATA_URL*/FILE_URI,
      //   quality: 100,
      //   targetWidth: 1000,
      //   targetHeight: 1000,
      //   encodingType: Camera.EncodingType.JPEG,
      //   correctOrientation: true
      // }
      // Camera.getPicture(cameraOptions).then(photo => this.produto.image = photo, err => console.log(err));
    }
}

