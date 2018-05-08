import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ClassComponentsPage } from './class-comments.page';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {path: '', component: ClassComponentsPage}
];
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        // FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        PageNavigatorComponentModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        ClassComponentsPage
    ],
    entryComponents: [
        ClassComponentsPage
    ],
    bootstrap: [ClassComponentsPage],
    schemas: []
})
export class ClassCommentsPageModule {
}

