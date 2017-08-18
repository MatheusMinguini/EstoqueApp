import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { BarCodeForm } from '../formulario/formulario_barCode';
import { Configuracao } from '../../services/config.service';
import { Http } from '@angular/http';

import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
    providers : [ GrupoService, Produto, CurrencyMaskModule, Grupo, Configuracao],
    selector : 'formulario',
    templateUrl : 'formulario.html'
})

export class FormularioPage{

  public produto : Produto;

  public _mensagem : Alert;

  public grupos : Array<Grupo>;

  myColor: string;
  isRound: boolean;

  public nomeValido: boolean;
  public publicoSelecionado: boolean;


  constructor(public _grupoService : GrupoService, public parametro : NavParams,
      public _navController : NavController,
      public _alert : AlertController,
      private _loadingCtrl: LoadingController,
      public _http: Http, public _configuracao : Configuracao){

  }

  ngOnInit(){

    this.nomeValido = false;
    this.publicoSelecionado = false;

    this.produto = new Produto();

      this._mensagem = this._alert.create({
          title : 'Aviso',
          buttons : [{text : 'Ok', handler : () => this._navController.setRoot(HomePage)}]
      })

      this.myColor = 'search-buttom';
      this.isRound = false;
  }

  continuar(){
    if(this.produto.verificarCamposObrigatorios(this.produto)){
      this._navController.push(BarCodeForm,  { produtoSalvar: this.produto});
    }else{
      this._alert.create({
          title : 'Campos obrigatórios',
          subTitle : 'Por favor, preencha todos os campos',
          buttons : [{ text: 'Entendi'}]
      }).present();

      let array = this.getCamposVazios();

      this.limparCorCampos();

      array.forEach(element => {
        element.setAttribute("style", "color: #f53d3d");
      });
    }
  }

  getCamposVazios(){
    let arr : any = [];

     if(!this.produto.descricao)
      arr.push(document.querySelector('#desc'));

     if(!this.produto.preco)
      arr.push(document.querySelector('#preco'));

     if(!this.produto.cor)
      arr.push(document.querySelector('#cor'));

     if(!this.produto.tamanho)
      arr.push(document.querySelector('#tamanho'));

     if(!this.produto.genero)
      arr.push(document.querySelector('#genero'));

     if(!this.produto.grupo_id){
       let input_grupo = document.querySelector('#grupo');
       if(null != input_grupo) arr.push(input_grupo);
     }

     return arr;

  }

  limparCorCampos(){
    document.querySelector('#desc').setAttribute("style", "color: #0084b4");
    document.querySelector('#preco').setAttribute("style", "color: #0084b4");
    document.querySelector('#cor').setAttribute("style", "color: #0084b4");
    document.querySelector('#tamanho').setAttribute("style", "color: #0084b4");
    document.querySelector('#genero').setAttribute("style", "color:#0084b4");

    let input_grupo = document.querySelector('#grupo');
    if(null != input_grupo) document.querySelector('#grupo').setAttribute("style", "color:#0084b4");

  }

  verificarDuplicidadeNome(){

    const loader = this._loadingCtrl.create(
        {
          content : "Verificando nome, aguarde"
        }
      );

    loader.present();

    this._http.get(this._configuracao.getAdressAPI() + '/verificaDuplicidadeNome?nome=' + this.produto.nome)
    .map(resp => resp.json())
      .toPromise()
        .then(elemento => {
          loader.dismiss();

          if (typeof elemento == 'undefined' || elemento.length == 0) {
             this.nomeValido = true;
          }else{
            this._alert.create(
            {
              title : 'Nome Existente',
              buttons : [{ text : "Tudo bem"}],
              subTitle : 'Verificamos e, já existem um produto com esse nome'
            }).present();
          }

        }).catch (erro => {
          loader.dismiss();
          this._alert.create(
            {
              title : 'Erro',
              buttons : [{ text : "Tudo bem", handler : () => this._navController.setRoot(HomePage) }],
              subTitle : 'Houve um erro ao consultar o nome, tente mais tarde'
            }
          ).present();
        });

  }

  buscarGrupo(){

    const loader = this._loadingCtrl.create({
      content : "Buscando grupos para esse público, aguarde"
    });

    loader.present();

    this._grupoService.buscarGruposInserir(this.produto.genero).then(elemento => {
        loader.dismiss();
        this.grupos = elemento;
        this.publicoSelecionado = true;
      }).catch (erro => {
        loader.dismiss();
        this._alert.create(
            {
              title : 'Erro',
              buttons : [{ text : "Tudo bem", handler : () => this._navController.setRoot(HomePage) }],
              subTitle : 'Houve um erro ao consultar os grupos, tente mais tarde'
            }
          ).present();
        console.log(erro);
      })
  }
}
