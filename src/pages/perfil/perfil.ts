import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/models/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { TopicoService } from '../../services/models/topico.service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioDTO;
  amizade: any[] = [];
  topico: any[] = [];
  mostrarRes: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public menu: MenuController,
    public topicoService: TopicoService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    this.usuarioService.buscarPerfil()
      .subscribe(response => {
        this.amizade = response.amizade;
        this.usuario = response as UsuarioDTO;
        this.topicoService.buscarTodosPost(this.usuario.id)
        .subscribe(response => {
          this.topico = response;
         console.log(this.topico);
        },
          error => {})
      },
        error => { });
        
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  mudarAmigosPage() {
    this.navCtrl.push('AmigosPerfilPage', { nome: this.usuario.nome, amizade: this.amizade })
  }
  mostrarResposta(){
    this.mostrarRes = true;
    console.log("passo aq");
  }
}
