import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ResignPage } from './resign.page';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';



const routes: Routes = [
  { path: '', component: ResignPage }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    MaterialModule,
    ModalServiceModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ResignPage
  ],
  entryComponents: [
    ResignPage
  ],
  bootstrap: [ResignPage],
  schemas: []
})
export class ResignPageModule { }
