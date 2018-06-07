import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'katalkenglish-payment-result-page',
    templateUrl: 'katalkenglish-payment-result.page.html',
    styleUrls: ['katalkenglish-payment-result.page.scss']
})
export class KatalkEnglishPaymentResultPage {
    re;
    message;
    point = 0;
    constructor(
        public active: ActivatedRoute,
        public a: AppService
    ) {

        active.queryParams.subscribe(params => {
            // console.log('params: ', params);

            this.re = params['result'] === 'true';
            this.message = params['message'];
        });

        this.a.loadMyPoint(p => {
            this.point = p;
        });

    }
}



