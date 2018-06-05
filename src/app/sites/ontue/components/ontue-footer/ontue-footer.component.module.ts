import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OntueFooterComponent } from './ontue-footer.component';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
    OntueFooterComponent
  ],
  exports: [
    RouterModule,
    OntueFooterComponent
  ],
  schemas: []
})
export class OntueFooterComponentModule { }

