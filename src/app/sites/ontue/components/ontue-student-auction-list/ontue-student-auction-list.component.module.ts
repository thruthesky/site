import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { OntueStudentAuctionListComponent } from './ontue-student-auction-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslatePipeModule
    ],
    declarations: [
        OntueStudentAuctionListComponent
    ],
    exports: [
        RouterModule,
        OntueStudentAuctionListComponent
    ],
    schemas: []
})
export class OntueStudentAuctionListComponentModule {
}

