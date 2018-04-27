import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { KatalkEnglishInstanceSchedulePage } from './katalkenglish-instance-schedule.page';

const appRoutes: Array<Route> = [
    { component: KatalkEnglishInstanceSchedulePage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishInstanceSchedulePage
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule
    ],
    entryComponents: [
        KatalkEnglishInstanceSchedulePage
    ],
    bootstrap: [KatalkEnglishInstanceSchedulePage]
})
export class KatalkEnglishInstanceSchedulePageModule { }
