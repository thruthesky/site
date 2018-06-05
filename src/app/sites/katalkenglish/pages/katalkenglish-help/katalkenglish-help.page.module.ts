import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatalkEnglishHelpPage } from './katalkenglish-help.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: KatalkEnglishHelpPage }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslatePipeModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        KatalkEnglishHelpPage
    ],
    entryComponents: [
        KatalkEnglishHelpPage
    ],
    bootstrap: [KatalkEnglishHelpPage],
    schemas: []
})
export class KatalkEnglishHelpPageModule { }
