import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';



const routes: Routes = [
  { path: '', component: LoginPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    MaterialModule
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
