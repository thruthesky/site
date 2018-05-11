import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OntueMyDayoffPage } from './ontue-my-dayoff.page';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';


const routes: Routes = [
    { path: '', component: OntueMyDayoffPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueMyDayoffPage
    ],
    entryComponents: [
        OntueMyDayoffPage
    ],
    bootstrap: [OntueMyDayoffPage],
    schemas: []
})
export class OntueMyDayoffPageModule { }
