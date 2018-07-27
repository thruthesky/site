import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { AuctionListPage } from './auction-list.page';


const routes: Routes = [
  { path: '', component: AuctionListPage }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AuctionListPage
  ],
  entryComponents: [
    AuctionListPage
  ],
  bootstrap: [AuctionListPage],
  schemas: []
})
export class AuctionListPageModule { }
