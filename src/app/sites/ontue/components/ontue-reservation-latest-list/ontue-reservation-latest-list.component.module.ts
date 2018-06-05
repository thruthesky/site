import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueReservationLatestListComponent } from './ontue-reservation-latest-list.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueReservationLatestListComponent
  ],
  exports: [
    RouterModule,
      OntueReservationLatestListComponent
  ],
  schemas: []
})
export class OntueReservationLatestListComponentModule { }

