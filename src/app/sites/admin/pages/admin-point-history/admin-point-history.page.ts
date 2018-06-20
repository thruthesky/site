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

    point_log_actions: Array<string> = [];
    point_log_selected: { [key: string]: boolean } = {};
    point_log_selected_all = false;
    point_log_selected_empty = false;

    constructor(
        public a: AppService
    ) {

        this.loadPointHistory();

        this.a.lms.point_log_actions_get().subscribe( re => {
            console.log('point_log_actions_get', re);
            this.point_log_actions = re;
        });
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

        const actionKeys = Object.keys(this.point_log_selected);
        let q_actions = '';
        const actions = [];
        if ( actionKeys ) {
            actionKeys.forEach( v => {
                if ( this.point_log_selected[v] ) {
                    actions.push(`action='${v}'`);
                }
            });

            if (this.point_log_selected_empty) {
                actions.push(`action=''`);
            }
            if ( actions.length ) {
                q_actions = `AND ( ` + actions.join(' OR ') + `)`;
            }
        }

        /**
         * @see lms.admin_query() for detail.
         */
        this.a.lms.admin_query({
            sql: `SELECT p.*
					FROM lms_point_log as p, wp_users
					WHERE BRANCH ${q_user} ${q_actions} AND wp_users.ID=p.idx_student
					ORDER BY idx DESC LIMIT ${this.limit}`,
            student_info: true,
            teacher_info: true
        })
            .subscribe((re: Array<POINT_HISTORY>) => {
                console.log('re: ', re);
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


    selectActions() {
        this.point_log_actions.forEach( v => {
           this.point_log_selected[v] = this.point_log_selected_all;
        });
        this.point_log_selected_empty = this.point_log_selected_all;
        console.log('point_log_selected', this.point_log_selected);
        console.log('point_log_selected_all', this.point_log_selected_all);
        console.log('point_log_selected_empty', this.point_log_selected_empty);
    }



}



