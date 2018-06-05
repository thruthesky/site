import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { AppService } from '../app.service';

export interface ModalData {
    title?: string;
    content: string;
    ok?: string;
}

@Injectable()
export class ModalService {

    dialogRef: MatDialogRef<DialogComponent> = null;


    constructor(
        public dialog: MatDialog,
        public readonly a: AppService
    ) { }

    /**
     * Show a alert modal box
     * @param data data to dsiplay on modal
     *
     */
    alert( data: ModalData ): void {
        if ( !data.ok ) {
            data.ok = this.a.t('OK');
        }
        this.dialogRef = this.dialog.open(DialogComponent, {
            disableClose: true,
            width: '320px',
            data: data
        });

        this.dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed. re: ', result);
        });
    }
    close() {
        if ( this.dialogRef ) {
            this.dialogRef.close();
        }
    }

}

