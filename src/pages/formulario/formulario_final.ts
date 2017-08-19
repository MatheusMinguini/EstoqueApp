import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Produto } from '../../models/Produto';
import { Configuracao } from '../../services/config.service';
import { Camera } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';

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

    loader : any;

    constructor(public parametro : NavParams ,
      public _navController: NavController,
      private _loadingCtrl: LoadingController,
      public _http: Http,
      public _alert : AlertController,
      public _configuracao: Configuracao,
      public actionSheetCtrl: ActionSheetController){

    }

    ngOnInit() {
      this.produto = this.parametro.get('produtoSalvar');
      this._mensagem = this._alert.create({
          title: 'Aviso',
          buttons : [{text : 'Ok', handler : () => this._navController.setRoot(HomePage)}]
        })

      this.loader = this._loadingCtrl.create(
        {
          content : "Salvando o produto, aguarde"
        }
      );
    }

    salvar(){
      this.loader.present();
      this._http.post(this._configuracao.getAdressAPI() + '/salvar', this.produto)
        .toPromise().then(elemento => {
          this._mensagem.setSubTitle('Produto cadastrado com sucesso');
          this._mensagem.present();
          this.loader.dismiss();
      }).catch (erro => {
          this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
          this._mensagem.present();
          console.log(erro);
          this.loader.dismiss();
      });
    }

    private abrirGaleria (): void {

      let configuracao : Object =  this.configuracoesPhoto('');

      Camera.getPicture(configuracao).then(photo => {
        this.produto.img = photo;
        let imagem : any;
        imagem = document.getElementById('imagemSelecionada');
        imagem.src = "data:image/jpeg;base64," + photo;
      },
      err => {
        this._mensagem.setSubTitle(err);
        this._mensagem.present();
      });
    }

    private abrirCamera (): void {
      let configuracao : Object =  this.configuracoesPhoto('camera');

      Camera.getPicture(configuracao).then(photo => {
        this.produto.img = photo;
        let imagem : any;
        imagem = document.getElementById('imagemSelecionada');
        imagem.src = "data:image/jpeg;base64," + photo;
      },
      err => {
        this._mensagem.setSubTitle(err);
        this._mensagem.present();
      });
    }

    configuracoesPhoto(param){
      let fonte;

      (param == "camera")? fonte = Camera.PictureSourceType.CAMERA : fonte = Camera.PictureSourceType.PHOTOLIBRARY;

      let cameraOptions = {
        sourceType: fonte,
        destinationType: Camera.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
      }

      return cameraOptions;
    }

    apresentarOpcoes() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Inserir foto para o produto',
        buttons: [
          {
            text: 'Tirar uma foto',
            role: 'destructive',
            handler: () => {
              this.abrirCamera();
            }
          },{
            text: 'Escolher foto da Galeria',
            handler: () => {
              this.abrirGaleria ();
            }
          },{
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }

}

