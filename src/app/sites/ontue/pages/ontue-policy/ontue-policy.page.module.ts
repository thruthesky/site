import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntuePolicyPage } from './ontue-policy.page';



const routes: Routes = [
    { path: '', component: OntuePolicyPage }
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
        OntuePolicyPage
    ],
    entryComponents: [
        OntuePolicyPage
    ],
    bootstrap: [OntuePolicyPage],
    schemas: []
})
export class OntuePolicyPageModule { }
