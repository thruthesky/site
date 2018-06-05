import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { KatalkEnglishWelcomePage } from './katalkenglish-welcome.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

const appRoutes: Array<Route> = [
    { component: KatalkEnglishWelcomePage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishWelcomePage
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule
    ],
    entryComponents: [
        KatalkEnglishWelcomePage
    ],
    bootstrap: [KatalkEnglishWelcomePage]
})
export class KatalkEnglishWelcomePageModule { }

