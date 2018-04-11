import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserInfoComponent } from './user-info.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
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
