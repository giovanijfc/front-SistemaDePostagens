import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO= {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public authService: AuthService) {
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.authService.authenticate(this.creds)
     .subscribe(response => {
      console.log(response);
     },
     error => {console.log(error)})
  }
}
