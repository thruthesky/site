
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService, USER, USER_NOT_FOUND } from './../../../modules/firelibrary/core';
import { AppService } from '../../../providers/app.service';
import { USER_LOGIN } from '../../../modules/xapi/interfaces';


@Component({
    selector: 'admin-home-page',
    templateUrl: 'admin-home.page.html',
    styleUrls: ['admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

    form = <USER_LOGIN>{};
    adminList = null;
    constructor(
        public router: Router,
        public a: AppService
    ) {

        a.xapi.post({route: 'lms.admin_list'}).subscribe( re => {
            this.adminList = re;
        });
    }

    ngOnInit() {
    }


}
