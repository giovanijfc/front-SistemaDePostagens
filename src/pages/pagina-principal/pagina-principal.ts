import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-pagina-principal',
  templateUrl: 'pagina-principal.html',
})
export class PaginaPrincipalPage {

  texto: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log("refresh");
  }

  mudarPerfil(){
    this.navCtrl.push('PerfilPage');
  }

  recarregar(){
    this.ionViewWillEnter();
  }
  enviarPostagem(){
    console.log(this.texto);
  }
}
