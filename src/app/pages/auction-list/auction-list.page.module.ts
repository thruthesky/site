import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuctionListPage } from './auction-list.page';
import { MaterialModule } from '../../app.material.module';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { FormsModule } from '@angular/forms';
import { MessageModalServiceModule } from '../../providers/message-send-modal/message-send-modal.service.module';


const routes: Routes = [
    {path: '', component: AuctionListPage}
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MaterialModule,
        PageNavigatorComponentModule,
        MessageModalServiceModule
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
export class AuctionListPageModule {
}
