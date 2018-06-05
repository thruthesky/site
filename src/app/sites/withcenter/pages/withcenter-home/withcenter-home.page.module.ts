import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WithcenterHomePage } from './withcenter-home.page';

const routes: Routes = [
  { path: '', component: WithcenterHomePage }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    WithcenterHomePage
  ],
  entryComponents: [
    WithcenterHomePage
  ],
  bootstrap: [WithcenterHomePage],
  schemas: []
})
export class WithcenterHomePageModule { }
