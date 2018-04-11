
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService, USER, USER_NOT_FOUND } from './../../../modules/firelibrary/core';
import { AppService } from '../../../providers/app.service';
import { USER_LOGIN } from '../../../modules/xapi/interfaces';
import { SESSION } from '../../../modules/xapi/lms.service';


@Component({
    selector: 'point-refund-page',
    templateUrl: 'point-refund.page.html',
    styleUrls: ['point-refund.page.scss'],
})
export class PointRefundPage implements OnInit {

    re: Array<SESSION> = [];
    constructor(
        public router: Router,
        public a: AppService
    ) {
        a.lms.get_sessions_in_refund_progress().subscribe(re => {
            console.log(re);
            this.re = re;
            this.pre();
        }, e => a.toast(e));
    }

    ngOnInit() {
    }

    pre() {
        if (!this.re || !this.re.length) {
            return;
        }
        for (const session of this.re) {
            session.teacherName = this.a.shortName(session.teacherName);
            session.studentName = this.a.shortName(session.studentName);
        }

    }


}

