import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { TeacherReviewsPage } from './teacher-reviews.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    {path: '', component: TeacherReviewsPage}
];
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        PageNavigatorComponentModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        TeacherReviewsPage
    ],
    entryComponents: [
        TeacherReviewsPage
    ],
    bootstrap: [TeacherReviewsPage],
    schemas: []
})
export class TeacherReviewsPageModule {
}

