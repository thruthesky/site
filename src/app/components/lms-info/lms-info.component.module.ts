import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LmsInfoComponent } from './lms-info.component';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { IonicModule } from '@ionic/angular';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    TranslatePipeModule
  ],
  declarations: [
    LmsInfoComponent
  ],
  exports: [
    RouterModule,
    LmsInfoComponent
  ],
  schemas: []
})
export class LmsInfoComponentModule { }
