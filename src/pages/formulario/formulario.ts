import { Component, OnInit } from '@angular/core';
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

export class FormularioPage implements OnInit{

  public produto : Produto;

  public _mensagem : Alert;

  public grupos : Array<Grupo>;

  myColor: string;
  isRound: boolean;

  public nomeValido: boolean;
  public publicoSelecionado: boolean;

  public total_produtos : any;
  public total_preco : any;
  public data_cadastro: any;


  constructor(public _grupoService : GrupoService, public parametro : NavParams,
      public _navController : NavController,
      public _alert : AlertController,
      private _loadingCtrl: LoadingController,
      public _http: Http, public _configuracao : Configuracao){

  }

  ngOnInit(){

    const loader = this._loadingCtrl.create({
      content : "Buscando informações, aguarde"
    });

    loader.present();

    this._http.get(this._configuracao.getAdressAPI() + '/info')
    .map(resp => resp.json())
     .toPromise().then((el : any) => {
        this.total_produtos = el[0].total_produtos;
        this.total_preco = el[0].total_preco;
        this.data_cadastro = el[0].data_cadastro;
        loader.dismiss();
        if(!this.total_produtos && !this.total_preco) {
          this.total_produtos = 0;
          this.total_preco = 0.00;
        }
     }).catch(() => {
       this.total_produtos = "Sem Informação";
       this.total_preco = "Sem Informação";
        this._alert.create({
          title : 'Falha',
          subTitle : `Oops... Houve um erro ao buscar as informações.
          Mas fique tranquilo, isso não influenciará no cadastro`,
          buttons : [{ text: 'Entendi'}]
        }).present();

        loader.dismiss();
     })

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

    if(!this.produto.nome) {
      this._alert.create({
        title : 'Nome vazio',
        buttons : [{ text : "Entendi"}],
        subTitle : 'Por favor, escreva um nome para o produto'
      }).present();
    }else{
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
                subTitle : 'Verificamos e, já existe um produto com esse nome'
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
  }

  buscarGrupo(){

    const loader = this._loadingCtrl.create({
      content : "Buscando grupos para esse público, aguarde"
    });

    loader.present();

    this._grupoService.buscarGruposInserir(this.produto.genero).then(elemento => {
      console.log(elemento);
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
