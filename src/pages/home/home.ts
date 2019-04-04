import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public authService: AuthService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  login() {
    this.authService.authenticate(this.creds)
      .subscribe(response => {
        this.authService.sucessfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("PaginaPrincipalPage");
      },
        error => {})
  }
  registrar() {
    this.navCtrl.push('RegistrarPage');
  }

  trocarSenha() {
    this.navCtrl.push('TrocaSenhaPage');
  }
}
