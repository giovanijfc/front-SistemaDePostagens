import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';
import { TopicoService } from '../../services/models/topico.service';
import * as moment from 'moment';

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
      .subscribe((response:any) => {
        this.amizade = response.amizade;
        this.topicoService.buscarTodosPost(this.usuario.id)
          .subscribe((response:any) => {
            this.topico = response;
            this.topico.forEach(t => t.postPrincipal.data = moment(t.postPrincipal.data).format("DD/MM/YYYY [às] HH:mm:ss"));
            this.topico.forEach(t => t.postPrincipal.resposta.forEach(r => r.data = moment(r.data).format("DD/MM/YYYY [às] HH:mm:ss")));
          },
            error => { })
      },
        error => { })
  }
  mostrarResposta(id: number) {
    this.mostrarRes[id] = !this.mostrarRes[id];
  }
}
