import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordChangePage } from './password-change.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';


const routes: Routes = [
    { path: '', component: PasswordChangePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
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

