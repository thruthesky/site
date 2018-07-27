import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { MessageSendModalDialogComponent } from './dialog/message-send-modal.dailog.component';
import { MessageSendModalService } from './message-send-modal.service';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { FormsModule } from '../../../../node_modules/@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslatePipeModule
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
export class MessageModalServiceModule { }

