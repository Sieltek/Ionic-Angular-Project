import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePseudoPage } from './change-pseudo.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePseudoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangePseudoPage]
})
export class ChangePseudoPageModule {}
