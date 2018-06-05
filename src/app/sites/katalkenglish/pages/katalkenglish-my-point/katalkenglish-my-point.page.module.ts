import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatalkEnglishMyPointPage } from './katalkenglish-my-point.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';


const routes: Routes = [
    {path: '', component: KatalkEnglishMyPointPage}
];
@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    KatalkEnglishMyPointPage
  ],
  entryComponents: [
    KatalkEnglishMyPointPage
  ],
  bootstrap: [KatalkEnglishMyPointPage],
  schemas: []

})
export class KatalkEnglishMyPointPageModule {
}
