
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';
import { FormularioPage } from '../pages/formulario/formulario';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { ResultadoPage } from '../pages/resultado/resultado';
import { FormularioCadastroPage } from '../pages/formulario/formulario_final';
import { MenuComponent } from '../pages/menu/menu.component';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { Camera } from 'ionic-native';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@NgModule({
  declarations: [
    MyApp,
    HomePage, EscolhaPage, FormularioPage, PesquisaPage, ResultadoPage, FormularioCadastroPage, MenuComponent
  ],
  imports: [
    CurrencyMaskModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    FormularioPage,
    PesquisaPage,
    ResultadoPage,
    FormularioCadastroPage,
    MenuComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera
  ]
})
export class AppModule {}
