import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';
import { KatalkEnglishPointHistoryPage } from './katalkenglish-point-history.page';


const appRoutes: Array<Route> = [
    { component: KatalkEnglishPointHistoryPage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishPointHistoryPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule,
        MaterialModule
    ],
    entryComponents: [
        KatalkEnglishPointHistoryPage
    ],
    bootstrap: [KatalkEnglishPointHistoryPage]
})
export class KatalkEnglishPointHistoryPageModule { }

