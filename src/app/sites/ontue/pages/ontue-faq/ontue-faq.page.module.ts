import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueFAQPage } from './ontue-faq.page';



const routes: Routes = [
    { path: '', component: OntueFAQPage }
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
        OntueFAQPage
    ],
    entryComponents: [
        OntueFAQPage
    ],
    bootstrap: [OntueFAQPage],
    schemas: []
})
export class OntueFAQPageModule { }
