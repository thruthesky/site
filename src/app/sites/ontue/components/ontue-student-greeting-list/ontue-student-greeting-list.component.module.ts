import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { OntueStudentGreetingListComponent } from './ontue-student-greeting-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslatePipeModule
    ],
    declarations: [
        OntueStudentGreetingListComponent
    ],
    exports: [
        RouterModule,
        OntueStudentGreetingListComponent
    ],
    schemas: []
})
export class OntueStudentGreetingListComponentModule {
}

