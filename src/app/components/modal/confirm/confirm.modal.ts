import { Component, Inject } from '@angular/core';
import { AppService } from '../../../providers/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


export interface _CONFIRM_DATA_OPTION {
    header: string;
    content: string;
    actionYes: string;
    actionNo: string;
}

@Component({
    selector: 'confirm-modal',
    templateUrl: 'confirm.modal.html',
    styleUrls: ['confirm.modal.scss'],
})
export class ConfirmModal {

    @Inject(MAT_DIALOG_DATA) public data: _CONFIRM_DATA_OPTION = <_CONFIRM_DATA_OPTION>{};

    constructor(
        public a: AppService,
        // public dialogRef: MatDialogRef<ConfirmModal>
    ) { }

    // onCloseClick(): void {
    //     this.dialogRef.close();
    // }

}
