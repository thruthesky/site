import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueEvaluationLatestListComponent } from './ontue-evaluation-latest-list.component';
import { PageNavigatorComponentModule } from '../../../../components/page-navigator/page-navigator.component.module';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        MaterialModule,
        TranslatePipeModule,
        PageNavigatorComponentModule
    ],
    declarations: [
        OntueEvaluationLatestListComponent
    ],
    exports: [
        RouterModule,
        OntueEvaluationLatestListComponent
    ],
    schemas: []
})
export class OntueEvaluationLatestListComponentModule {
}

