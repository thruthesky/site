import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KatalkEnglishFooterComponent } from './katalkenglish-footer.component';
import { MaterialModule } from '../../../../app.material.module';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
    KatalkEnglishFooterComponent
  ],
  exports: [
    RouterModule,
    KatalkEnglishFooterComponent
  ],
  schemas: []
})
export class KatalkEnglishFooterComponentModule { }
