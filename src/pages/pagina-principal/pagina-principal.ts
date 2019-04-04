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
  postagens: any [] = [];

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
      .subscribe(response => {
        this.usuario = response as UsuarioDTO;
        this.topicoService.buscarTodosPostAmigosESeu(this.usuario.id)
          .subscribe(response => {
            console.log(response);
            response.forEach(t => t.data = moment(t.data).format("DD/MM/YYYY [às] HH:mm:ss"));
            response.forEach(t => t.resposta.forEach(r => r.data = moment(r.data).format("DD/MM/YYYY [às] HH:mm:ss")));
            this.postagens = response;
            
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
        this.showInsertOk();
      },
      error => {console.log(error)});
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Status 200: Sucesso!",
      message: "Sua postagem foi feita com sucesso!",
      enableBackdropDismiss: false,
      buttons: [{
        text: "Continuar",
      }]
    });
    alert.present();
  }
}
