import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Alert  } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { Http } from '@angular/http';
import { ResultadoPage } from '../resultado/resultado';
import { Configuracao } from '../../services/config.service';
import { HomePage } from '../home/home';

@Component({
  providers : [ Configuracao, GrupoService ],
  selector: 'pesquisa',
  templateUrl: 'pesquisa.html'
})

export class PesquisaPage{

  public _mensagem: Alert;
  public produto: Produto;
  produtos: Produto[] = [];
  cores: Array<String>;
  tamanhos: Array<String>;
  myColor: string = 'search-buttom';
  isRound: boolean = false;
  grupos: Array<Grupo>;

  pesquisarTodos: boolean;
  pesquisarCodigoBarras: boolean;
  mostrarBotao : boolean;


  constructor( public _grupoService : GrupoService, public _http: Http, public navCtrl: NavController,
    public _configuracao: Configuracao,
    public _loadingCtrl: LoadingController,
    public _alertCtrl: AlertController){

  }

  ngOnInit() {

    this.pesquisarTodos = false;
    this.mostrarBotao = false;
    this.pesquisarCodigoBarras=  false;
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

    this._grupoService.buscarGrupos().then(elemento => {
        this.grupos = elemento;
      }).catch (erro => {
          console.log(erro);
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

    const loader = this._loadingCtrl.create({
          content : "Procurando produtos com esse perfil"
    });

    if(this.pesquisarTodos){
      this.produto = new Produto();
    }


    loader.present();

    this._http.post(this._configuracao.getAdressAPI() + '/filtrar', this.produto)
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

  conferirPreenchimento(){
    this.mostrarBotao = this.produto.verificarPreenchimento(this.produto);
  }

  buscarTodos(ligado : boolean){
    if(ligado){
      this.pesquisarTodos = true;
      this.mostrarBotao = true;
    }else{
      this.pesquisarTodos = false;
      this.mostrarBotao = false;
    }
  }

  buscarCodigoBarras(ligado : boolean){
    if(ligado){
      this.pesquisarCodigoBarras = true;
      this.mostrarBotao = true;
    }else{
      this.pesquisarCodigoBarras = false;
      this.mostrarBotao = false;
    }
  }
}


