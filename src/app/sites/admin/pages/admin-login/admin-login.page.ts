import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-login-page',
    templateUrl: 'admin-login.page.html',
    styleUrls: ['admin-login.page.scss']
})

export class AdminLoginPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}




