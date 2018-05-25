import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../app.material.module';

import { OntueActivityLogComponent } from './ontue-activity-log.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueActivityLogComponent
  ],
  exports: [
    RouterModule,
      OntueActivityLogComponent
  ],
  schemas: []
})
export class OntueActivityLogComponentModule { }

