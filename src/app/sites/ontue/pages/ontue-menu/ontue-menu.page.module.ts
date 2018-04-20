import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import {OntueMenuPage} from './ontue-menu.page';



const routes: Routes = [
    { path: '', component: OntueMenuPage }
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
        OntueMenuPage
    ],
    entryComponents: [
        OntueMenuPage
    ],
    bootstrap: [OntueMenuPage],
    schemas: []
})
export class OntueMenuPageModule { }
