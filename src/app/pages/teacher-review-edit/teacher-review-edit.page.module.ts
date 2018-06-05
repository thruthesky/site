import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.material.module';
import { TeacherReviewEditPage } from './teacher-review-edit.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: TeacherReviewEditPage }
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
        TeacherReviewEditPage
    ],
    entryComponents: [
        TeacherReviewEditPage
    ],
    bootstrap: [TeacherReviewEditPage],
    schemas: []
})
export class TeacherReviewEditPageModule { }
