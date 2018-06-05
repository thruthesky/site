import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatalkEnglishFooterComponent } from './katalkenglish-footer.component';
import { MaterialModule } from '../../../../app.material.module';

import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
