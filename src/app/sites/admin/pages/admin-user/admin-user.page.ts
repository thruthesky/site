import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-user-page',
    templateUrl: 'admin-user.page.html',
    styleUrls: ['admin-user.page.scss']
})

export class AdminUserPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}




