import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { OntueTopEarnerComponent } from './ontue-top-earner.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueTopEarnerComponent
  ],
  exports: [
    RouterModule,
      OntueTopEarnerComponent
  ],
  schemas: []
})
export class OntueTopEarnerComponentModule { }

