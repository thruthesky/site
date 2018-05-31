import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { KatalkEnglishMainBannerComponent } from './katalkenglish-main-banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
    KatalkEnglishMainBannerComponent
  ],
  exports: [
    RouterModule,
    KatalkEnglishMainBannerComponent
  ],
  schemas: []
})
export class KatalkEnglishMainBannerComponentModule { }
