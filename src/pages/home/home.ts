import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http'
import { EscolhaPage } from '../escolha/escolha';
import { FormularioPage } from '../formulario/formulario';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { Produto } from '../../models/Produto'
import { Configuracao } from '../../services/config.service';




@Component({
  providers : [ Configuracao ],
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public _mensagem : Alert;
  public produtos : Produto[] = [];

  constructor(public navCtrl: NavController,
              private _http: Http,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController,
              public _configuracao: Configuracao
              ) {
    this._mensagem = _alertCtrl.create({
      title : 'Aviso',
      buttons : [{ text : "Tudo bem", handler : () => this.navCtrl.setRoot(HomePage)}]
    });
  }

  ngOnInit() {
    let self = this;

      const loader = this._loadingCtrl.create(
        {
          content : "Carregando produtos recentemente cadastrados, aguarde"
        }
      );

      loader.present();

     this._http.get(this._configuracao.getAdressAPI() + '/produtos')
     .map(resp => resp.json())
      .toPromise()
        .then(elemento => {
          this.produtos = elemento;
          loader.dismiss();
        }).catch (erro => {
          loader.dismiss();
          this._alertCtrl.create(
            {
              title : 'Falha na Conexão',
              buttons : [{ text : "Estou ciente"}],
              subTitle : 'Não foi possível obter a lista de produtos, por favor, tente mais tarde'
            }
          ).present();

        });
        // .then(function(resp){
        //   self.carros = resp;
        //   loader.dismiss();
        // }).catch(function(err){
        //   console.log(err);
        // });
  }

  seleciona(produto: Object){
    this.navCtrl.push(EscolhaPage, { produtoSelecionado: produto});
  }

  cadastra(){
    this.navCtrl.push(FormularioPage);
  }

  pesquisa(){
    this.navCtrl.push(PesquisaPage);
  }

  confirmarOperacao(objeto) {
    let alert = this._alertCtrl.create({
      title: 'Confirmar Operação',
      message: 'Você vendeu o produto e deseja excluí-lo?',
      buttons: [
        {
          text: 'Não excluir',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.remover(objeto);
          }
        }
      ]
    });
    alert.present();
  }

  remover(produto){
    this._http.post(this._configuracao.getAdressAPI() + '/remover', produto)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
           this._mensagem.setSubTitle('Produto removido');
           this._mensagem.present();
        }).catch (erro => {
            this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
            this._mensagem.present();
            console.log(erro);
        });
  }
}
