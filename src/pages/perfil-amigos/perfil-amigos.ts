import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';
import { TopicoService } from '../../services/models/topico.service';

@IonicPage()
@Component({
  selector: 'page-perfil-amigos',
  templateUrl: 'perfil-amigos.html',
})
export class PerfilAmigosPage {

  usuario: any;
  amizade: any[] = [];
  topico: any[] = [];
  mostrarRes: boolean[]= [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public topicoService: TopicoService) {
  }

  ionViewWillEnter() {
    this.usuario = this.navParams.get("usuario");
    this.usuarioService.buscarAmigoPerfil(this.usuario.email)
      .subscribe(response => {
        this.amizade = response.amizade;
        this.topicoService.buscarTodosPost(this.usuario.id)
          .subscribe(response => {
            this.topico = response;
            for(var i=0; i < this.topico.length; ++i){
              this.mostrarRes.push(false);
            }
          },
            error => { })
      },
        error => { })
  }
  mostrarResposta(id: number) {
    if (this.mostrarRes[id] == true) {
      this.mostrarRes[id] = false;
    } else {
      this.mostrarRes[id] = true;
    }
  }
}
