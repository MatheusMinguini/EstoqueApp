import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, Alert } from 'ionic-angular';
import { Produto } from '../../models/Produto';

/*import { SocialSharing } from '@ionic-native/social-sharing';*/

@Component({
    selector : 'escolha',
    templateUrl : 'escolha.html'
})

export class EscolhaPage{

    mensagem: Alert;

    textoSocial: string;
    image: string;

    public produto : Produto;

    constructor(public parametro : NavParams, public _alert: AlertController/*, private socialSharing: SocialSharing*/){

    }

    criarMensagem (titulo: string, subtitle: string) : Alert {
      let msg: Alert;

      msg = this._alert.create({
        title: titulo,
        subTitle : subtitle,
        buttons: [{text: 'Tudo bem'}]
      })

      return msg;
    }

    ngOnInit(){
      this.produto = this.parametro.get('produtoSelecionado');
      this.textoSocial = `Dados do Produto: Nome: ${this.produto.nome}`;
    }

    compartilharWhatsApp(){
      // this.socialSharing.canShareVia('whatssapp').then(() => {
      //     this.socialSharing.shareViaWhatsApp(this.message, this.image).then(() => {

              this.mensagem = this.criarMensagem("Aviso", "Dados compartilhados");
              this.mensagem.present();

      //     }).catch(() => {
      //       this.mensagem = this.criarMensagem("Aviso", "Ocorreu algum problema, tente em instantes");
      //       this.mensagem.present();
      //     })
      // }).catch(() => {
      //    this.mensagem = this.criarMensagem("Aviso", "Não é possível compartilhar com o WhatsApp");
      //    this.mensagem.present();
      // });
    }

    compartilharFacebook(){

    }

    compartilharInstagram(){

    }
}
