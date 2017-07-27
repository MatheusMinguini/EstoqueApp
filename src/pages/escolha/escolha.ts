import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Produto } from '../../models/Produto'

@Component({
    selector : 'escolha',
    templateUrl : 'escolha.html'
})

export class EscolhaPage{

    public produto : Produto;

    constructor(public parametro : NavParams){

    }

    ngOnInit(){
      this.produto = this.parametro.get('produtoSelecionado');
    }
}
