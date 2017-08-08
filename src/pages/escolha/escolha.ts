import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, Alert } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { Configuracao } from '../../services/config.service';

/*import { SocialSharing } from '@ionic-native/social-sharing';*/

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

    constructor(public _grupoService : GrupoService, public parametro : NavParams, public _alert: AlertController/*, private socialSharing: SocialSharing*/){

    }

    ngOnInit(){
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
