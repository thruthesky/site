import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';


export interface ModalData {
    title?: string;
    content: string;
    ok?: string; // Okay button for alert.
    yes?: string; //  For confirm, it will be 'Yes' button
    no?: string; // No button for confirm.
    maxWidth?: string;
    type?: 'alert' | 'confirm';
}

@Injectable()
export class ModalService {

    dialogRef: MatDialogRef<DialogComponent> = null;


    constructor(
        public sanitizer: DomSanitizer,
        public dialog: MatDialog,
        public readonly a: AppService
    ) { }

    sanitizeData( data: ModalData ) {
        if (!data.ok) {
            data.ok = this.a.t('OK');
        }
        if (!data.yes) {
            data.yes = this.a.t('Yes');
        }
        if (!data.no) {
            data.no = this.a.t('No');
        }
        if (data.content) {
            data.content = <any>this.sanitizer.bypassSecurityTrustHtml(data.content);
        }
        if ( ! data.maxWidth ) {
            data.maxWidth = '800px';
        }
        if ( ! data.type ) {
            data.type = 'alert';
        }
        return data;
    }
    /**
     * Show a alert modal box
     * @param data data to dsiplay on modal
     *
     */
    alert(data: ModalData): void {
        this.sanitizeData(data);
        this.dialogRef = this.dialog.open(DialogComponent, {
            disableClose: true,
            maxWidth: data.maxWidth,
            data: data
        });
        this.dialogRef.afterClosed().subscribe(result => {
            //
        });
    }

    /**
     * Returns an Observable<boolean> after the choice of users.
     * @param data ModalData
     */
    confirm(data: ModalData) {
        data.type = 'confirm';
        this.sanitizeData(data);
        this.dialogRef = this.dialog.open(DialogComponent, {
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

