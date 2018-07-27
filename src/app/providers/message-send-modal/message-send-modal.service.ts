import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { MessageSendModalDialogComponent } from './dialog/message-send-modal.dailog.component';


export interface MessageSendModalData {
    title?: string;
    send?: string; //  For confirm, it will be 'Yes' button
    cancel?: string; // No button for confirm.
    maxWidth?: string;
}

@Injectable()
export class MessageSendModalService {

    dialogRef: MatDialogRef<MessageSendModalDialogComponent> = null;


    constructor(
        public sanitizer: DomSanitizer,
        public dialog: MatDialog,
        public readonly a: AppService
    ) { }

    sanitizeData( data: MessageSendModalData ) {
        if ( ! data.maxWidth ) {
            data.maxWidth = '800px';
        }
        return data;
    }
    /**
     * Show a alert modal box
     * @param data data to dsiplay on modal
     *
     * @return boolean of Observable
     *      true will be returned after close.
     */
    open(data: MessageSendModalData): Observable<boolean> {
        this.sanitizeData(data);
        this.dialogRef = this.dialog.open(MessageSendModalDialogComponent, {
            disableClose: true,
            maxWidth: data.maxWidth,
            data: data
        });
        return this.dialogRef.afterClosed();
    }

    close() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

}

