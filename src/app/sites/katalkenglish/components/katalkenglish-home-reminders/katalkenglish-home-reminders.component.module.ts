import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { KatalkEnglishHomeRemindersComponent } from './katalkenglish-home-reminders.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
      KatalkEnglishHomeRemindersComponent
  ],
  exports: [
    RouterModule,
    KatalkEnglishHomeRemindersComponent
  ],
  schemas: []
})
export class KatalkEnglishHomeRemindersComponentModule { }
