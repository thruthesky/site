import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoaderDialogComponent } from './loader-dialog-component/loader-dialog-component';

export interface LoaderData {
    title: string;
    content: string;
}

@Injectable()
export class LoaderService {

    dialogRef: MatDialogRef<LoaderDialogComponent> = null;


    constructor(public dialog: MatDialog) { }

    /**
     * Show a modal of loader.
     * @param data data to dsiplay on modal
     * @code
     *
        loader.openLoader({title: 'Registering', content: 'Please wait ...'});
        setTimeout(() => loader.closeLoader(), 5000);
     *
     */
    openLoader( data: LoaderData ): void {
        this.dialogRef = this.dialog.open(LoaderDialogComponent, {
            disableClose: true,
            width: '320px',
            data: data
        });

        this.dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }
    closeLoader() {
        if ( this.dialogRef ) {
            this.dialogRef.close();
        }
    }

}

