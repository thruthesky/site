import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KatalkEnglishHeaderComponent } from './katalkenglish-header.component';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    MaterialModule,
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
