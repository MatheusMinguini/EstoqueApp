import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
    selector: 'menu-icon',
    templateUrl: 'menu.component.html'
})

export class MenuComponent{
  
    constructor(public navCtrl: NavController){
      
    }
    retornar(){
        this.navCtrl.setRoot(HomePage);
    }
}