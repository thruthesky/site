import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-point-history-page',
    templateUrl: 'admin-point-history.page.html',
    styleUrls: ['admin-point-history.page.scss']
})

export class AdminPointHistoryPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}



