import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { OntueStudentRegistrationListComponent } from './ontue-student-registration-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueStudentRegistrationListComponent
  ],
  exports: [
    RouterModule,
      OntueStudentRegistrationListComponent
  ],
  schemas: []
})
export class OntueStudentRegistrationListComponentModule { }

