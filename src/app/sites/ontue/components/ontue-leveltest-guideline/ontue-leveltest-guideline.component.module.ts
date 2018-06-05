import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueLeveltestGuidelineComponent } from './ontue-leveltest-guideline.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueLeveltestGuidelineComponent
  ],
  exports: [
    RouterModule,
      OntueLeveltestGuidelineComponent
  ],
  schemas: []
})
export class OntueLeveltestGuidelineComponentModule { }

