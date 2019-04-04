import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { TopicoService } from '../../services/models/topico.service';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioDTO;
  amizade: any[] = [];
  topico: any[] = [];
  mostrarRes: boolean[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public menu: MenuController,
    public topicoService: TopicoService) {
    this.mostrarRes = [];
  }

  ionViewWillEnter() {
    this.mostrarRes = [];
    this.menu.swipeEnable(false);
    this.usuarioService.buscarPerfil()
      .subscribe(response => {
        this.amizade = response.amizade;
        this.usuario = response as UsuarioDTO;
        this.topicoService.buscarTodosPost(this.usuario.id)
          .subscribe(response => {
            this.topico = response;
            this.topico.forEach(t => t.postPrincipal.data = moment(t.postPrincipal.data).format("DD/MM/YYYY [às] HH:mm:ss"));
            this.topico.forEach(t => t.postPrincipal.resposta.forEach(r => r.data = moment(r.data).format("DD/MM/YYYY [às] HH:mm:ss")));
            this.topico.forEach(t => this.mostrarRes.push(false));
          },
            error => { });
      },
        error => { });
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  mudarAmigosPage() {
    this.navCtrl.push('AmigosPerfilPage', { nome: this.usuario.nome, amizade: this.amizade })
  }

  mostrarResposta(id: number) {
    if (this.mostrarRes[id] == true) {
      this.mostrarRes[id] = false;
    } else {
      this.mostrarRes[id] = true;
    }
  }
}
