import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatalkEnglishHeaderComponent } from './katalkenglish-header.component';

import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
    KatalkEnglishHeaderComponent
  ],
  exports: [
    RouterModule,
    KatalkEnglishHeaderComponent
  ],
  schemas: []
})
export class KatalkEnglishHeaderComponentModule { }
