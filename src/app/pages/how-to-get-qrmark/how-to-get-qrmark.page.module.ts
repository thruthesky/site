import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HowToGetQRMARKPage } from './how-to-get-qrmark.page';

const routes: Routes = [
  { path: '', component: HowToGetQRMARKPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
      HowToGetQRMARKPage
  ],
  entryComponents: [
      HowToGetQRMARKPage
  ],
  bootstrap: [HowToGetQRMARKPage],
  schemas: []
})
export class HowToGetQRMARKPageModule { }
