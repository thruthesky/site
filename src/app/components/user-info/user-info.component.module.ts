import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserInfoComponent } from './user-info.component';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
    UserInfoComponent
  ],
  exports: [
    RouterModule,
    UserInfoComponent
  ],
  schemas: []
})
export class UserInfoComponentModule { }
