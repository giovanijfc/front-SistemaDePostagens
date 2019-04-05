import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { UsuarioService } from '../../services/models/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { PostagemService } from '../../services/models/postagem.service';
import { TopicoService } from '../../services/models/topico.service';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-pagina-principal',
  templateUrl: 'pagina-principal.html',
})
export class PaginaPrincipalPage {

  texto: string = "";
  usuario: UsuarioDTO;
  topico: any [] = [];
  mostrarRes: any[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public usuarioService: UsuarioService,
     public postagemService: PostagemService,
     public topicoService: TopicoService,
     public alertCtrl: AlertController) {
    this.texto = "";
  }

  ionViewWillEnter() {
    this.usuarioService.buscarPerfil()
      .subscribe((response:any) => {
        this.usuario = response as UsuarioDTO;
        this.topicoService.buscarTodosPostAmigosESeu(this.usuario.id)
          .subscribe((response:any) => {
            this.topico = response;
            this.topico.forEach(t => t.postPrincipal.data = moment(t.postPrincipal.data).format("DD/MM/YYYY [às] HH:mm:ss"));
            this.topico.forEach(t => t.postPrincipal.resposta.forEach(r => r.data = moment(r.data).format("DD/MM/YYYY [às] HH:mm:ss")));
          },
          error => {});
      },
      error => {})
  }

  mudarPerfil(){
    this.navCtrl.push('PerfilPage');
  }
  recarregar(){
    this.ionViewWillEnter();
  }
  enviarPostagem(){
    this.postagemService.enviarPostagem(this.usuario.id, this.texto)
      .subscribe(response => {
        this.ionViewWillEnter();
      },
      error => {});
  }
  mostrarResposta(id: number) {
    this.mostrarRes[id] = !this.mostrarRes[id];
  }
}
