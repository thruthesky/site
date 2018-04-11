import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KatalkEnglishHelpPage } from './katalkenglish-help.page';
const routes: Routes = [
    { path: '', component: KatalkEnglishHelpPage }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes)
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
