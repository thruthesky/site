import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../app.material.module';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueGradingSystemComponent } from './ontue-grading-system.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueGradingSystemComponent
  ],
  exports: [
    RouterModule,
      OntueGradingSystemComponent
  ],
  schemas: []
})
export class OntueGradingSystemComponentModule { }

