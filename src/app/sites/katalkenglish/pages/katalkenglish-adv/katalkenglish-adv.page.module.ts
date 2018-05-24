import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KatalkEnglishAdvPage } from './katalkenglish-adv.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: KatalkEnglishAdvPage }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
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
