import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatalkEnglishAdvPage } from './katalkenglish-adv.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: KatalkEnglishAdvPage }
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
        KatalkEnglishAdvPage
    ],
    entryComponents: [
        KatalkEnglishAdvPage
    ],
    bootstrap: [KatalkEnglishAdvPage],
    schemas: []
})
export class KatalkEnglishAdvPageModule { }
