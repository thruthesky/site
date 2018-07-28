import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { FormsModule } from '@angular/forms';
import { MessageModalServiceModule } from '../../providers/message-send-modal/message-send-modal.service.module';
import { NewStudentListPage } from './new-student-list.page';


const routes: Routes = [
    {path: '', component: NewStudentListPage}
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
        NewStudentListPage
    ],
    entryComponents: [
        NewStudentListPage
    ],
    bootstrap: [NewStudentListPage],
    schemas: []
})
export class NewStudentListPageModule {
}
