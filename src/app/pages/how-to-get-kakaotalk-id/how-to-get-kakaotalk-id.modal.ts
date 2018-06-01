import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'how-to-get-kakaotalk-id-modal',
    templateUrl: 'how-to-get-kakaotalk-id.modal.html',
    styleUrls: ['how-to-get-kakaotalk-id.modal.scss'],
})
export class HowToGetkakaotalkIDModal {

    constructor(
        public a: AppService,
        public dialogRef: MatDialogRef<HowToGetkakaotalkIDModal>,
    ) { }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}
