import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { TeacherReviewListPage } from './teacher-review-list.page';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';


const routes: Routes = [
    { path: '', component: TeacherReviewListPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
        PageNavigatorComponentModule
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
