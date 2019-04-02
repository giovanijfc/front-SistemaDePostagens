import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginalPrincipalPage } from './paginal-principal';

@NgModule({
  declarations: [
    PaginalPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginalPrincipalPage),
  ],
})
export class PaginalPrincipalPageModule {}
