import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'how-to-get-qrmark-page',
    templateUrl: 'how-to-get-qrmark.page.html',
    styleUrls: ['how-to-get-qrmark.page.scss'],
})
export class HowToGetQRMARKPage {

    constructor(
        public a: AppService
    ) { }


}
