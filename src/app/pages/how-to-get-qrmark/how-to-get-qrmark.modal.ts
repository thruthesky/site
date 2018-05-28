import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'how-to-get-qrmark-modal',
    templateUrl: 'how-to-get-qrmark.modal.html',
    styleUrls: ['how-to-get-qrmark.modal.scss'],
})
export class HowToGetQRMARKModal {

    constructor(
        public a: AppService,
        public dialogRef: MatDialogRef<HowToGetQRMARKModal>,
    ) { }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}
