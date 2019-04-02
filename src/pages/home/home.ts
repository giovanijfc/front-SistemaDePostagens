import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }
}
