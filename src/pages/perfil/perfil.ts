import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioDTO;
  response: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    this.usuarioService.buscarPerfil()
      .subscribe(response => {
        console.log(response);
        this.usuario = response as UsuarioDTO;
      },
        error => { });
  }

}
