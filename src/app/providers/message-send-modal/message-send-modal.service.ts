import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { MessageSendModalDialogComponent } from './dialog/message-send-modal.dailog.component';


export interface MessageSendModalData {
    ID: number;
    name?: string;
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

    sanitizeData(data: MessageSendModalData) {
        if (!data.maxWidth) {
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
    open(data: MessageSendModalData) {
        this.sanitizeData(data);
        this.dialogRef = this.dialog.open(MessageSendModalDialogComponent, {
            disableClose: true,
            maxWidth: data.maxWidth,
            data: data
        });
        this.dialogRef.afterClosed().subscribe(res => {
            console.log('Message box closed: ', res);
            if (res) {
                if (res.length < 10) {
                    this.a.toast('Message is too short...');
                    return;
                }
                this.a.lms.message_send({
                    ID: data.ID,
                    message: res
                }).subscribe(re => {
                    console.log('apply_auction: ', re);
                    this.a.toast('Message Sent...');
                }, e => {
                    this.a.toast(e);
                });
            }
        });
    }

}

