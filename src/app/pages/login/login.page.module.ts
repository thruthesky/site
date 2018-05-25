import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


import { LoginPage } from './login.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';



const routes: Routes = [
  { path: '', component: LoginPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslatePipeModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LoginPage
  ],
  entryComponents: [
    LoginPage
  ],
  bootstrap: [LoginPage],
  schemas: []
})
export class LoginPageModule { }
