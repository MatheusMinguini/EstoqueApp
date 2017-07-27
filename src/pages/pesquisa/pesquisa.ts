import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Produto } from '../../models/Produto';
import { Grupo } from '../../models/Grupo';
import { Http } from '@angular/http';
import { ResultadoPage } from '../resultado/resultado';
import { Configuracao } from '../../services/config.service';

@Component({
  providers : [ Configuracao ],
  selector: 'pesquisa',
  templateUrl: 'pesquisa.html'
})

export class PesquisaPage{

  public produto: Produto;

  produtos: Produto[] = [];

  cores: Array<String>;

  myColor: string = 'search-buttom';
  isRound: boolean = false;

  constructor( public _http: Http, public navCtrl: NavController, public _configuracao: Configuracao){
      this.produto = new Produto();
      this.buscarCores();
  }

  buscarCores(){
    this._http.get(this._configuracao.getAdressAPI() + '/cores')
      .map(resp => resp.json())
        .toPromise().then(elemento => {
        this.cores = elemento.cor;
    }).catch (erro => {
        console.log(erro);
    });
  }

  pesquisar(){

    this._http.post(this._configuracao.getAdressAPI() + '/filtrar', this.produto)
      .map(resp => resp.json())
        .toPromise().then(elemento => {
        this.produtos = elemento;
        console.log(this.produtos);
        //this.navCtrl.push(ResultadoPage, { produtosEncontrados: this.produtos});
    }).catch (erro => {

        console.log(erro);
    });
  }
}


