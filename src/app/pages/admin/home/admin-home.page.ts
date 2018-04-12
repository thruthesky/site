
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
    constructor(
        public router: Router,
        public fire: FireService,
        public a: AppService
    ) {


        /**
         * @see lms.admin_query() for detail.
         */
        this.a.lms.admin_query({ table: 'wp_users', fields: '' })
            .subscribe(re => {
                console.log('re: ', re);
            }, e => this.a.toast(e));
    }

    ngOnInit() {
    }


}
