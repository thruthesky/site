import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { PasswordChangePage } from './password-change.page';


const routes: Routes = [
    { path: '', component: PasswordChangePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        PasswordChangePage
    ],
    entryComponents: [
        PasswordChangePage
    ],
    bootstrap: [PasswordChangePage],
    schemas: []
})
export class PasswordChangePageModule { }

