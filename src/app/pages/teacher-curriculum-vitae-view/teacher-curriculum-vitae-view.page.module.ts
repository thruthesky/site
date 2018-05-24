import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TeacherCurriculumVitaeViewPage } from './teacher-curriculum-vitae-view.page';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: TeacherCurriculumVitaeViewPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        TeacherCurriculumVitaeViewPage
    ],
    entryComponents: [
        TeacherCurriculumVitaeViewPage
    ],
    bootstrap: [TeacherCurriculumVitaeViewPage],
    schemas: []
})
export class TeacherCurriculumVitaeViewPageModule { }
