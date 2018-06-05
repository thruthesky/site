import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueGradingSystemComponent } from './ontue-grading-system.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueGradingSystemComponent
  ],
  exports: [
    RouterModule,
      OntueGradingSystemComponent
  ],
  schemas: []
})
export class OntueGradingSystemComponentModule { }

