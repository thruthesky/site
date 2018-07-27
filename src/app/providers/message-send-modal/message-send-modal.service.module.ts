import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { MessageSendModalDialogComponent } from './dialog/message-send-modal.dailog.component';
import { MessageSendModalService } from './message-send-modal.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
  ],
  declarations: [
    MessageSendModalDialogComponent
  ],
  entryComponents: [
    MessageSendModalDialogComponent
  ],
  providers: [ MessageSendModalService ]
})
export class ModalServiceModule { }

