import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmigosPerfilPage } from './amigos-perfil';

@NgModule({
  declarations: [
    AmigosPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(AmigosPerfilPage),
  ],
})
export class AmigosPerfilPageModule {}
