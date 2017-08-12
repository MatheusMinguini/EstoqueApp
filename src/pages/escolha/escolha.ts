import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { Configuracao } from '../../services/config.service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  providers : [ Configuracao, GrupoService ],
  selector : 'escolha',
  templateUrl : 'escolha.html'
})

export class EscolhaPage{

    mensagem: Alert;

    image: string;

    grupoDoProduto: Grupo;

    grupos : Array<Grupo>;

    public produto : Produto;

    cor : string;

    loader : any;

    msgSucesso: Alert;

    msg : string;

    constructor(public _grupoService : GrupoService,
      public parametro : NavParams,
      public _alert: AlertController,
      private _loadingCtrl: LoadingController,
      private socialSharing: SocialSharing){

    }

    ngOnInit(){

      this.produto = this.parametro.get('produtoSelecionado');
      if(this.produto.img == null){
        this.produto.img = "assets/img/semImagem.gif";
      }

      this.msg = `Nome do Produto: ${this.produto.nome}\nPreço: ${this.produto.preco} \nCor: ${this.produto.cor} \nTamanho: ${this.produto.tamanho} \nDescrição: ${this.produto.descricao} `;

      this.msgSucesso = this._alert.create({
        title : 'Compartilhado',
        buttons : [{ text : 'Ok'}]
      });

      this.loader = this._loadingCtrl.create({
          content : "Compartilhando os dados, aguarde..."
      });

      if(this.produto.codigo_barras == null){
        this.produto.codigo_barras = "Não cadastrado";
        this.cor = 'danger';
      }else{
        this.cor = 'dark-grey';
      }

      /*this.grupoDoProduto = this._grupoService.buscarGrupos().then(elemento => {
        return elemento.find((objPromise) => objPromise.id == this.produto.grupo_id);
      }).catch (erro => console.log("Erro: " + erro));*/

    }

    compartilharWhatsApp(){
      this.socialSharing.shareViaWhatsApp(this.msg, this.produto.img, null).then(() => {
        this.msgSucesso.setSubTitle('Os dados foram compartilhados no WhatsApp');
        this.msgSucesso.present();
      }).catch(() => {
        this.criarMensagem('Erro ao compartilhar', 'Encontramos um erro ao compartilhar, tente mais tarde').present();
      });
    }

    compartilharFacebook(){
      this.socialSharing.shareViaFacebook(this.msg, this.produto.img, null).then(() => {
        this.msgSucesso.setSubTitle('Os dados foram compartilhados no Facebook');
        this.msgSucesso.present();
      }).catch(() => {
        this.loader.dismiss();
        this.criarMensagem('Erro ao compartilhar', 'Encontramos um erro ao compartilhar, tente mais tarde').present();
      });
    }

    compartilharInstagram(){
      this.socialSharing.shareViaInstagram(this.msg, this.produto.img).then(() => {
        this.msgSucesso.setSubTitle('Os dados foram compartilhados no Instagram');
        this.msgSucesso.present();
      }).catch(() => {
        this.loader.dismiss();
        this.criarMensagem('Erro ao compartilhar', 'Encontramos um erro ao compartilhar, tente mais tarde').present();
      });
    }

    compartilhar(){
      this.socialSharing.share(this.msg, "Informações do produto", this.produto.img, null).then(() => {
        this.msgSucesso.setSubTitle('Os dados foram compartilhados');
        this.msgSucesso.present();
      }).catch(() => {
        this.criarMensagem('Erro ao compartilhar', 'Encontramos um erro ao compartilhar, tente mais tarde').present();
      }); 
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
}
