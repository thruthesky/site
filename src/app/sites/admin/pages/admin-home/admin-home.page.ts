import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-home-page',
    templateUrl: 'admin-home.page.html',
    styleUrls: ['admin-home.page.scss']
})

export class AdminHomePage implements OnInit {
    constructor(
        public a: AppService
    ) {
        if ( a.isLogout ) {
            this.a.toast('Please login first');
            this.a.open('/manager/login');
        }
    }

    ngOnInit() { }
}



