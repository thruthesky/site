import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HowToInstallKakaotalkPage } from './how-to-install-kakaotalk.page';

const routes: Routes = [
  { path: '', component: HowToInstallKakaotalkPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
      HowToInstallKakaotalkPage
  ],
  entryComponents: [
      HowToInstallKakaotalkPage
  ],
  bootstrap: [HowToInstallKakaotalkPage],
  schemas: []
})
export class HowToInstallKakaotalkPageModule { }
