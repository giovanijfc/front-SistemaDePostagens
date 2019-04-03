import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/models/usuario.service';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public usuarioService: UsuarioService) {
    this.formGroup = this.formBuilder.group({
      nome: ["Giovani Jose Fonseca Chiodi", [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      email: ["giovanijfc22@gmail.com", [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(40)]],
      senha: ["123456", [Validators.required, Validators.minLength(6), Validators.maxLength(35),]],
      palavraChave: ["geogeo", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  registrar() {
    this.usuarioService.registrar(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => {});
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Status:200||Sucesso!",
      message: "Você foi registrado com sucesso!",
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
