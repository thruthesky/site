import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { FormsModule } from '@angular/forms';
import { GreetingListPage } from './greeting-list.page';
import { MessageModalServiceModule } from '../../providers/message-send-modal/message-send-modal.service.module';


const routes: Routes = [
    {path: '', component: GreetingListPage}
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
        GreetingListPage
    ],
    entryComponents: [
        GreetingListPage
    ],
    bootstrap: [GreetingListPage],
    schemas: []
})
export class GreetingListPageModule {
}
