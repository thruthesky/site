import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueGuideAndTipsComponent } from './ontue-guide-and-tips.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueGuideAndTipsComponent
  ],
  exports: [
    RouterModule,
      OntueGuideAndTipsComponent
  ],
  schemas: []
})
export class OntueGuideAndTipsComponentModule { }

