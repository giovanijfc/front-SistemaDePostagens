import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { NovaSenha } from '../../models/novasenha.dto';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the TrocaSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-troca-senha',
  templateUrl: 'troca-senha.html',
})
export class TrocaSenhaPage {

  novaSenha: NovaSenha;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthService,
    public alertCtrl: AlertController) {
    this.novaSenha = {
      email: "",
      palavraChave: "",
      novaSenha: ""
    };
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  trocarSenha() {
    this.authService.novaSenha(this.novaSenha)
      .subscribe(response => {
        this.showAlterOk();
      },
        error => { })
  }
  showAlterOk() {
    let alert = this.alertCtrl.create({
      title: "Status:200||Sucesso!",
      message: "Senha alterada com sucesso!",
      enableBackdropDismiss: false,
      buttons: [{
        text: "Continuar",
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
