import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrocaSenhaPage } from './troca-senha';

@NgModule({
  declarations: [
    TrocaSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(TrocaSenhaPage),
  ],
})
export class TrocaSenhaPageModule {}
