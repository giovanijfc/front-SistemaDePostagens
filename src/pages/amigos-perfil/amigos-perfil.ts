import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';
import * as moment from 'moment';


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
    this.amizade.forEach(x => x.data = moment(x.data).format("DD/MM/YYYY"));
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
