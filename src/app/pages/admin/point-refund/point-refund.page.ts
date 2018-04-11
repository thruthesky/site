
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService, USER, USER_NOT_FOUND } from './../../../modules/firelibrary/core';
import { AppService } from '../../../providers/app.service';
import { USER_LOGIN } from '../../../modules/xapi/interfaces';


@Component({
    selector: 'point-refund-page',
    templateUrl: 'point-refund.page.html',
    styleUrls: ['point-refund.page.scss'],
})
export class PointRefundPage implements OnInit {

    re;
    constructor(
        public router: Router,
        public a: AppService
    ) {
        a.lms.get_sessions_in_refund_progress().subscribe(re => {
            console.log(re);
            this.re = re;
        }, e => a.toast(e));
    }

    ngOnInit() {
    }


}

