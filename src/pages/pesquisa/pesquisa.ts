import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Alert  } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { Http } from '@angular/http';
import { ResultadoPage } from '../resultado/resultado';
import { Configuracao } from '../../services/config.service';
import { HomePage } from '../home/home';

@Component({
  providers : [ Configuracao ],
  selector: 'pesquisa',
  templateUrl: 'pesquisa.html'
})

export class PesquisaPage{

  public _mensagem: Alert;
  public produto: Produto;
  produtos: Produto[] = [];
  cores: Array<String>;
  myColor: string = 'search-buttom';
  isRound: boolean = false;



  constructor( public _http: Http, public navCtrl: NavController,
    public _configuracao: Configuracao,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController){

      this.produto = new Produto();
      this.buscarCores();

      this._mensagem = _alertCtrl.create({
        title : "Aviso",
        buttons : [
          { text: "Tentar outra Pesquisa", handler : () => this.navCtrl.push(PesquisaPage)},
          { text: "Retornar a página Principal", handler: () => this.navCtrl.setRoot(HomePage)}
        ]
      })


  }

  buscarCores(){
    this._http.get(this._configuracao.getAdressAPI() + '/cores')
      .map(resp => resp.json())
        .toPromise().then(elemento => {

        let cores = elemento;
        this.cores = cores.map((el) => el.cor);

    }).catch (erro => {
        console.log(erro);
    });
  }

  pesquisar(){

    const loader = this._loadingCtrl.create({
          content : "Procurando produtos com esse perfil"
    });

    loader.present();

    this._http.post(this._configuracao.getAdressAPI() + '/filtrar', this.produto)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
        this.produtos = elemento;
        console.log(this.produtos);

        loader.dismiss();

        if(this.produtos.length > 0){
          this.navCtrl.push(ResultadoPage, { produtosEncontrados: this.produtos});
        }else{
           this._mensagem.setSubTitle('Não encontramos nenhum produto com esse filtro');
           this._mensagem.present();
        }

    }).catch (erro => {
        loader.dismiss();
        this._mensagem.setSubTitle('Ocorreu algum problema. Tente mais tarde');
        this._mensagem.present();
        console.log(erro);
    });
  }
}


