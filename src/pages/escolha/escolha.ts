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



    constructor(public _grupoService : GrupoService,
      public parametro : NavParams,
      public _alert: AlertController,
      private _loadingCtrl: LoadingController,
      private socialSharing: SocialSharing){

    }

    ngOnInit(){
      this.msgSucesso = this._alert.create({
        title : 'Compartilhado',
        buttons : [{ text : 'Ok'}]
      });

      this.loader = this._loadingCtrl.create({
          content : "Compartilhando os dados, aguarde..."
      });

      this.produto = this.parametro.get('produtoSelecionado');
      if(this.produto.img == null){
        this.produto.img = "../../assets/img/semImagem.gif";
      }

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
      this.loader.present();
      let msg = `Nome do Produto: ${this.produto.nome}\n Preço: ${this.produto.preco} \n Cor: ${this.produto.cor} \n Tamanho: ${this.produto.tamanho} \n`;

      this.socialSharing.shareViaWhatsApp(msg, this.produto.img, null).then(() => {
        this.loader.dismiss();
        this.msgSucesso.setSubTitle('Os dados foram compartilhados no WhatsApp');
        this.msgSucesso.present();
      }).catch(() => {
        this.loader.dismiss();
        this.criarMensagem('Erro ao compartilhar', 'Encontramos um erro ao compartilhar, tente mais tarde').present();
      });
    }

    compartilharFacebook(){

    }

    compartilharInstagram(){

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
