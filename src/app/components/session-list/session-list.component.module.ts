import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SessionListComponent } from './session-list.component';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
    SessionListComponent
  ],
  exports: [
    RouterModule,
    SessionListComponent
  ],
  schemas: []
})
export class SessionListComponentModule { }
