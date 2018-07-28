import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'message-send-modal-dailog-component',
    templateUrl: 'message-send-modal.dailog.component.html',
    styleUrls: ['message-send-modal.dailog.component.scss']
})
export class MessageSendModalDialogComponent {

    content = '';
    constructor(
        public dialogRef: MatDialogRef<MessageSendModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }


}

