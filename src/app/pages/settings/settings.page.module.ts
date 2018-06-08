import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: SettingsPage }
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
        SettingsPage
    ],
    entryComponents: [
        SettingsPage
    ],
    bootstrap: [SettingsPage],
    schemas: []
})
export class SettingsPageModule { }

