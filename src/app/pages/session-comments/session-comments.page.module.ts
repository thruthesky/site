import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { PageNavigatorComponentModule } from '../../components/page-navigator/page-navigator.component.module';
import { SessionCommentsPage } from './session-comments.page';


const routes: Routes = [
    {path: '', component: SessionCommentsPage}
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
        SessionCommentsPage
    ],
    entryComponents: [
        SessionCommentsPage
    ],
    bootstrap: [SessionCommentsPage],
    schemas: []
})
export class SessionCommentsPageModule {
}

