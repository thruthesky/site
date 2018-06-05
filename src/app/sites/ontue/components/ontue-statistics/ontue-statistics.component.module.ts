import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueStatisticsComponent } from './ontue-statistics.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueStatisticsComponent
  ],
  exports: [
    RouterModule,
      OntueStatisticsComponent
  ],
  schemas: []
})
export class OntueStatisticsComponentModule { }

