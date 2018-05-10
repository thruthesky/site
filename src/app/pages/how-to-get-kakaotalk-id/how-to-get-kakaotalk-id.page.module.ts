import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HowToGetKakaotalkIdPage } from './how-to-get-kakaotalk-id.page';

const routes: Routes = [
  { path: '', component: HowToGetKakaotalkIdPage }
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
      HowToGetKakaotalkIdPage
  ],
  entryComponents: [
      HowToGetKakaotalkIdPage
  ],
  bootstrap: [HowToGetKakaotalkIdPage],
  schemas: []
})
export class HowToGetKakaotalkIdPageModule { }
