import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the AmigosPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amigos-perfil',
  templateUrl: 'amigos-perfil.html',
})
export class AmigosPerfilPage {

  nome: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    this.nome = this.navParams.get('nome');
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
