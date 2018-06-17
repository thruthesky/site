import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-payment-page',
    templateUrl: 'admin-payment.page.html',
    styleUrls: ['admin-payment.page.scss']
})

export class AdminPaymentPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}



