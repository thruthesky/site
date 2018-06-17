import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-point-refund-page',
    templateUrl: 'admin-point-refund.page.html',
    styleUrls: ['admin-point-refund.page.scss']
})

export class AdminPointRefundPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}



