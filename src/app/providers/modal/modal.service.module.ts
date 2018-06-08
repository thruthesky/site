import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../../app.material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
  ],
  declarations: [
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [ ModalService ]
})
export class ModalServiceModule { }

