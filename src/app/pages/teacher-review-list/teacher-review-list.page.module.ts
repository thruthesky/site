import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.material.module';
import { TeacherReviewListPage } from './teacher-review-list.page';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';


const routes: Routes = [
    { path: '', component: TeacherReviewListPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
        PageNavigatorComponentModule,
        ModalServiceModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        TeacherReviewListPage
    ],
    entryComponents: [
        TeacherReviewListPage
    ],
    bootstrap: [TeacherReviewListPage],
    schemas: []
})
export class TeacherReviewListPageModule { }
