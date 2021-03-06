import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, Alert  } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { Http } from '@angular/http';
import { ResultadoPage } from '../resultado/resultado';
import { Configuracao } from '../../services/config.service';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  providers : [ Configuracao, GrupoService ],
  selector: 'pesquisa',
  templateUrl: 'pesquisa.html'
})

export class PesquisaPage implements OnInit{

  public _mensagem: Alert;
  public produto: Produto;
  produtos: Produto[] = [];
  cores: Array<String>;
  tamanhos: Array<String>;
  myColor: string = 'search-buttom';
  isRound: boolean = false;
  grupos: Array<Grupo>;
  result : any;

  pesquisarTodos: boolean;
  pesquisarCodigoBarras: boolean;
  pesquisarKey: boolean;

  mostrarBotao : boolean;
  publicoSelecionado : boolean;


  constructor(private barcodeScanner: BarcodeScanner,  public _grupoService : GrupoService, public _http: Http, public navCtrl: NavController,
    public _configuracao: Configuracao,
    public _loadingCtrl: LoadingController,
    public _alertCtrl: AlertController){

  }

  ngOnInit() {

    this.pesquisarTodos = false;
    this.pesquisarKey = false;
    this.pesquisarCodigoBarras=  false;

    this.mostrarBotao = true;
    this.publicoSelecionado = false;

    this.produto = new Produto();
    this.buscarCores();
    this.buscarTamanhos();

    this._mensagem = this._alertCtrl.create({
      title : "Aviso",
      buttons : [
        {
          text: "Retornar a página Principal", handler: () => {
            this.navCtrl.setRoot(HomePage);
            this.produto = new Produto();
            console.log(this.produto);
          }
        }
      ]
    })
  }

  buscarTamanhos(){
    this._http.get(this._configuracao.getAdressAPI() + '/tamanhos')
      .map(resp => resp.json())
        .toPromise().then(elemento => {

        console.log(elemento);
        let tamanhos = elemento;
        this.tamanhos = tamanhos.map((el) => el.t);

    }).catch (erro => {
        console.log(erro);
    });
  }

  buscarCores(){
    this._http.get(this._configuracao.getAdressAPI() + '/cores')
      .map(resp => resp.json())
        .toPromise().then(elemento => {

        let cores = elemento;
        this.cores = cores.map((el) => el.c);

    }).catch (erro => {
        console.log(erro);
    });
  }

  pesquisar(){

    if(this.pesquisarTodos){
      this.produto = new Produto();
    }

    if(!this.pesquisarTodos && !this.pesquisarCodigoBarras && !this.pesquisarKey && !this.produto.verificarFiltros(this.produto) ){
      this._alertCtrl.create({
        title: 'Filtro vazio',
        buttons: [{text: 'Entendi'}],
        subTitle: 'Para podermos melhorar a pesquisa, nos ajude preenchendo alguma informação do produto'
      }).present();
    }else{
      this.filtrar();
    }

  }

  filtrar(){

    let parametro;

    const loader = this._loadingCtrl.create({
          content : "Procurando produtos com esse perfil"
    });

    loader.present();

    if(this.pesquisarKey === true ){
      parametro = '/filtrarPorDescricao';
      let aux : String = this.produto.descricao;
      this.produto = new Produto();
      this.produto.descricao = aux;
    }else{
      parametro = '/filtrar';
    }

    this._http.post(this._configuracao.getAdressAPI() + parametro, this.produto)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
        this.produtos = elemento;

        loader.dismiss();

        if(this.produtos.length > 0){
          this.navCtrl.push(ResultadoPage, { produtosEncontrados: this.produtos});
        }else{
           const _mensagem = this._alertCtrl.create({
              title : "Aviso",
              buttons : [
                { text: "Tentar outra Pesquisa"},
                { text: "Retornar a página Principal", handler: () => this.navCtrl.setRoot(HomePage)}
              ]
          })
           _mensagem.setSubTitle('Não encontramos nenhum produto com esse filtro');
           _mensagem.present();
        }

    }).catch (erro => {
        loader.dismiss();
        this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
        this._mensagem.present();
        console.log(erro);
    });

  }

  buscarTodos(ligado : boolean){
    if(ligado){
      this.pesquisarTodos = true;
    }else{
      this.pesquisarTodos = false;
    }
  }

  buscarCodigoBarras(ligado : boolean){
    if(ligado){
      this.pesquisarCodigoBarras = true;
      this.mostrarBotao = false;
    }else{
      this.produto.codigo_barras = null;
      this.pesquisarCodigoBarras = false;
      this.mostrarBotao = true;
    }
  }

  buscarPalavraChaves(ligado : boolean ){
    if(ligado){
      this.pesquisarKey = true;
    }else{
      this.produto.descricao = null;
      this.pesquisarKey = false;
    }
  }

  lerCodigoBarras(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.result = barcodeData;
      this.produto.codigo_barras = this.result.text;

      if(this.produto.codigo_barras != null){
        this.mostrarBotao =  true;
      }

    }, (err) => {
      this._alertCtrl.create({
        title: 'Aviso',
        buttons: [{text: 'Entendi'}],
        subTitle: 'Ocorreu algum problema ao ler o Código de barras'
      }).present();
    })
  }

  limparFiltros(){
    this.publicoSelecionado = false;
    this.produto = new Produto();
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
        this._alertCtrl.create(
            {
              title : 'Erro',
              buttons : [{ text : "Tudo bem", handler : () => this.navCtrl.setRoot(HomePage) }],
              subTitle : 'Houve um erro ao consultar os grupos, tente mais tarde'
            }
          ).present();
        console.log(erro);
      })
  }

}


