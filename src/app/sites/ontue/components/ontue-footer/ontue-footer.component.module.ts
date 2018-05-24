import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OntueFooterComponent } from './ontue-footer.component';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
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

