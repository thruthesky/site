import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueGradedLatestListComponent } from './ontue-graded-latest-list.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueGradedLatestListComponent
  ],
  exports: [
    RouterModule,
      OntueGradedLatestListComponent
  ],
  schemas: []
})
export class OntueGradedLatestListComponentModule { }

