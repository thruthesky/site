import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { OntuePolicyForumComponent } from './ontue-policy-forum.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipeModule
  ],
  declarations: [
      OntuePolicyForumComponent
  ],
  exports: [
    RouterModule,
      OntuePolicyForumComponent
  ],
  schemas: []
})
export class OntuePolicyForumComponentModule { }
