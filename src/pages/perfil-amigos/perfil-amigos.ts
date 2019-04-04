import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';

/**
 * Generated class for the PerfilAmigosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-amigos',
  templateUrl: 'perfil-amigos.html',
})
export class PerfilAmigosPage {

  usuario: any;
  amizade: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService) {
  }

  ionViewWillEnter() {
    this.usuario = this.navParams.get("usuario");
    this.usuarioService.buscarAmigoPerfil(this.usuario.email)
     .subscribe(response => {
      this.amizade = response.amizade;
     },
     error => {})
  }

  mudarAmigosPage() {
    this.navCtrl.setRoot('AmigosPerfilPage', { nome: this.usuario.nome, amizade: this.amizade })
  }
}
