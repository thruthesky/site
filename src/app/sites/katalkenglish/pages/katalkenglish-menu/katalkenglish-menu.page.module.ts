import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { KatalkEnglishMenuPage } from './katalkenglish-menu.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


const appRoutes: Array<Route> = [
    { component: KatalkEnglishMenuPage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishMenuPage
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule
    ],
    entryComponents: [
        KatalkEnglishMenuPage
    ],
    bootstrap: [KatalkEnglishMenuPage]
})
export class KatalkEnglishMenuPageModule { }
