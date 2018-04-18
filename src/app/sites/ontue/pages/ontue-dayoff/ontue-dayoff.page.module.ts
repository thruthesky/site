import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OntueDayoffPage } from './ontue-dayoff.page';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: OntueDayoffPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueDayoffPage
    ],
    entryComponents: [
        OntueDayoffPage
    ],
    bootstrap: [OntueDayoffPage],
    schemas: []
})
export class OntueDayoffPageModule { }
