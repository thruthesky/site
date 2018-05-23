import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueReservationLatestListComponent } from './ontue-reservation-latest-list.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
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

