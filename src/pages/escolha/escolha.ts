import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector : 'escolha',
    templateUrl : 'escolha.html'
})

export class EscolhaPage{

    public produto : Object;

    constructor(public parametro : NavParams){

    }

    ngOnInit(){
         this.produto = this.parametro.get('produtoSelecionado');
    }
}
