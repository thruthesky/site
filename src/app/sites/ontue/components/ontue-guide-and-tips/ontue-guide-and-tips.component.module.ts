import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueGuideAndTipsComponent } from './ontue-guide-and-tips.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueGuideAndTipsComponent
  ],
  exports: [
    RouterModule,
      OntueGuideAndTipsComponent
  ],
  schemas: []
})
export class OntueGuideAndTipsComponentModule { }

