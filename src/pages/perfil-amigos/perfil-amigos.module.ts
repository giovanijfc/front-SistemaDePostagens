import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilAmigosPage } from './perfil-amigos';

@NgModule({
  declarations: [
    PerfilAmigosPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilAmigosPage),
  ],
})
export class PerfilAmigosPageModule {}
