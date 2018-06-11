import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { OntueHomeRemindersComponent } from './ontue-home-reminders.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueHomeRemindersComponent
  ],
  exports: [
    RouterModule,
    OntueHomeRemindersComponent
  ],
  schemas: []
})
export class OntueHomeRemindersComponentModule { }
