import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


import { KatalkEnglishInstallPage } from './katalkenglish-install.page';

const routes: Routes = [
  { path: '', component: KatalkEnglishInstallPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    KatalkEnglishInstallPage
  ],
  entryComponents: [
    KatalkEnglishInstallPage
  ],
  bootstrap: [KatalkEnglishInstallPage],
  schemas: []
})
export class KatalkEnglishInstallPageModule { }

