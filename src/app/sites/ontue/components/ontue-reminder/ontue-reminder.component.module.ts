import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueReminderComponent } from './ontue-reminder.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueReminderComponent
  ],
  exports: [
    RouterModule,
    OntueReminderComponent
  ],
  schemas: []
})
export class OntueReminderComponentModule { }

