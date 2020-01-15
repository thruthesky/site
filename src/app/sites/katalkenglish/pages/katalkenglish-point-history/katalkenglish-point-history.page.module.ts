import { NgModule } from '@angular/core';
import { KatalkEnglishPointHistoryPage } from './katalkenglish-Point-history.page';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';
import { FormsModule } from '@angular/forms';


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

