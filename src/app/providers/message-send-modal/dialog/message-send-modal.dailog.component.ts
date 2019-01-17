import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../app.service';

@Component({
    selector: 'message-send-modal-dailog-component',
    templateUrl: 'message-send-modal.dailog.component.html',
    styleUrls: ['message-send-modal.dailog.component.scss']
})
export class MessageSendModalDialogComponent {

    content = '';
    constructor(
        public dialogRef: MatDialogRef<MessageSendModalDialogComponent>,
        public a: AppService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }


}

