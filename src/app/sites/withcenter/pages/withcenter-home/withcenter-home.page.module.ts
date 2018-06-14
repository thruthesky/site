import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WithcenterHomePage } from './withcenter-home.page';
import { AboutFranchiseComponent } from '../../components/about-franchise/about-franchise.component';
import { UnderstandingFranchiseComponent } from '../../components/understanding-franchise/understanding-franchise.component';
import { AboutServiceComponent } from '../../components/about-service/about-service.component';
import { ApplyFranchiseComponent } from '../../components/apply-franchise/apply-franchise.component';

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
    WithcenterHomePage,
    AboutFranchiseComponent,
    UnderstandingFranchiseComponent,
    AboutServiceComponent,
    ApplyFranchiseComponent
  ],
  entryComponents: [
    WithcenterHomePage
  ],
  bootstrap: [WithcenterHomePage],
  schemas: []
})
export class WithcenterHomePageModule { }
