import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

interface POINT_HISTORY {
    action: string;
    after_point: string;
    apply_point: string;
    before_point: string;
    idx: number;
    idx_reservation: number;
    idx_student: number;
    idx_teacher: number;
    reason: string;
    stamp: number;
    point_change?: boolean;
    student: {
        email: string;
        phone_number: string;
        name: string;
        display_name: string;
        point: string;
        kakaotalk_id: string;
    };
    teacher: {
        email: string;
        name: string;
        display_name: string;
        kakaotalk_id: string;
        grade: number;
    };
}

@Component({
    selector: 'admin-point-history-page',
    templateUrl: 'admin-point-history.page.html',
    styleUrls: ['admin-point-history.page.scss']
})

export class AdminPointHistoryPage implements OnInit {

    re: Array<POINT_HISTORY> = [];
    uid: any = '';
    limit = 100;

    constructor(
        public a: AppService
    ) {

        this.loadPointHistory();
    }

    ngOnInit() { }

    loadPointHistory() {
        let q_user = '';
        if ( this.uid ) {
            if ( ! isNaN(this.uid) ) {
                q_user = ' AND wp_users.ID = ' + this.uid;
            } else {
                q_user = ` AND ( wp_users.user_email='${this.uid}' ) `;
            }
        }
        /**
         * @see lms.admin_query() for detail.
         */
        this.a.lms.admin_query({
            sql: `SELECT p.*
					FROM lms_point_log as p, wp_users
					WHERE BRANCH ${q_user} AND wp_users.ID=p.idx_student
					ORDER BY idx DESC LIMIT ${this.limit}`,
            student_info: true,
            teacher_info: true
        })
            .subscribe((re: Array<POINT_HISTORY>) => {
                // console.log('re: ', re);
                if (!re) {
                    return;
                }
                this.re = re;
                if (this.re.length) {
                    for (const log of this.re) {
                        const after = parseInt(log.before_point, 10) + parseInt(log.apply_point, 10);
                        // console.log('after: ', after);
                        log.point_change = parseInt(log.after_point, 10) === after;
                    }
                }
            }, e => this.a.toast(e));
    }
    onSubmit() {
        this.loadPointHistory();
    }
}



