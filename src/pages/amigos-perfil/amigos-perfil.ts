import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';

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
  amizade: any[];
  amigo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public usuarioService: UsuarioService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    this.nome = this.navParams.get('nome');
    this.amizade = this.navParams.get('amizade')
  }
  buscarAmigo(email: String) {
    this.usuarioService.buscarAmigoPerfil(email)
      .subscribe(response => {
        this.amigo = response;
        this.navCtrl.push('PerfilAmigosPage', {usuario: this.amigo});
      },
      error => {});
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
