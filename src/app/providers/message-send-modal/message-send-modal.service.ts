import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageSendModalDialogComponent } from './dialog/message-send-modal.dailog.component';


export interface MessageSendModalData {
    ID: number;
    name?: string;
    maxWidth?: string;
    minWidth?: string;
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
        if (!data.minWidth) {
            data.minWidth = '400px';
        }
        return data;
    }
    /**
     * Show a alert modal box for normal message
     * @param data data to display on modal
     *
     * @return boolean of Observable
     *      true will be returned after close.
     */
    open(data: MessageSendModalData) {
        this.sanitizeData(data);
        this.dialogRef = this.dialog.open(MessageSendModalDialogComponent, {
            disableClose: true,
            maxWidth: data.maxWidth,
            minWidth: data.minWidth,
            data: data
        });
        this.dialogRef.afterClosed().subscribe(res => {
            // console.log('Message box closed: ', res);
            if (res) {
                if (res.length < 10) {
                    this.a.toast( this.a.ln.MESSAGE_TOO_SHORT );
                    return;
                }
                this.a.lms.message_send({
                    ID: data.ID,
                    message: res
                }).subscribe(re => {
                    // console.log('message_send: ', re);
                    this.a.toast( this.a.ln.MESSAGE_SENT );
                }, e => {
                    this.a.toast(e);
                });
            }
        });
    }

    /**
     * Show a alert modal box for auction message
     * @param data data to display on modal
     *
     * @return boolean of Observable
     *      true will be returned after close.
     */
    auction(data: MessageSendModalData) {
        this.sanitizeData(data);
        this.dialogRef = this.dialog.open(MessageSendModalDialogComponent, {
            disableClose: true,
            maxWidth: data.maxWidth,
            minWidth: data.minWidth,
            data: data
        });
        this.dialogRef.afterClosed().subscribe(res => {
            // console.log('Message box closed: ', res);
            if (res) {
                if (res.length < 10) {
                    this.a.toast( this.a.ln.MESSAGE_TOO_SHORT );
                    return;
                }
                this.a.lms.apply_auction({
                    ID: data.ID,
                    message: res
                }).subscribe(re => {
                    // console.log('apply_auction: ', re);
                    this.a.toast( this.a.ln.MESSAGE_SENT );
                }, e => {
                    this.a.toast(e);
                });
            }
        });
    }

}

