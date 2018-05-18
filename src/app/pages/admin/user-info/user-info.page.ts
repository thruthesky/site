
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../providers/app.service';
import { USER_DATA_RESPONSE, BOOK } from '../../../modules/xapi/interfaces';

interface SHOW {
    loader: {
        loadProfile: boolean;
        updateProfile: boolean;
        updatePoint: boolean;
        profileSaved: boolean;
        loadSchedule: boolean;
        loayPayment: boolean;
    };
    pointUpdateForm: boolean;

}
@Component({
    selector: 'user-info-page',
    templateUrl: 'user-info.page.html',
    styleUrls: ['user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
    user: USER_DATA_RESPONSE = {};
    sessions: Array<BOOK> = [];
    sessionsToday: Array<BOOK> = [];
    count = {
        session: {
            future: 0,
            past: 0
        }
    };
    payments = [];
    show: SHOW = null;
    pointForm = null;
    limit = 500;

    constructor(
        public active: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
        active.paramMap.subscribe(params => {
            const ID = params.get('ID');
            console.log('params:', ID);
            this.init();
            this.loadInfo(ID);
            this.loadPayment(ID);
        });

    }

    ngOnInit() {

    }

    init() {
        this.show = {
            loader: {
                loadProfile: false,
                updateProfile: false,
                updatePoint: false,
                profileSaved: false,
                loadSchedule: false,
                loayPayment: false
            },
            pointUpdateForm: false
        };
        this.pointForm = {
            idx_student: 0,
            apply: '',
            point: 0,
            reason: '',
            payment_method: '',
            amount: '',
            currency: ''
        };

        this.sessions = [];
        this.sessionsToday = [];
    }

    loadInfo(ID) {

        this.show.loader.loadProfile = true;
        const sql = `SELECT * FROM wp_users WHERE BRANCH AND ID=${ID}`;
        this.a.lms.admin_query({
            sql: sql,
        }).subscribe(re => {
            this.show.loader.loadProfile = false;
            if (re && re.length) {
                this.user = re[0];
                /**
                 * Default, it should be student.
                 */
                if (this.user.user_type === '') {
                    this.user.user_type = 'S';
                }

                /**
                 * Schedule is loaded after user information.
                 * It needs user type.
                 */
                this.loadSchedule(ID);
            } else {
                this.a.toast('You are not Manager of this user.');
            }
            console.log(re);

            // this.onClickPointUpdate();
        }, e => this.a.toast(e));
    }
    onSubmitUserInfo() {
        // event.preventDefault();

        console.log(this.user);
        const u = this.user;
        const up = {
            route: 'lms.admin_user_update',
            session_id: this.a.user.sessionId,
            ID: u.ID,
            user_pass: u.user_pass,
            // email: u.user_email,
            user_type: u.user_type,
            display_name: u.display_name,
            name: u.name,
            gender: u.gender,
            phone_number: u.phone_number,
            kakaotalk_id: u.kakaotalk_id,
            grade: u.grade,
            list_order: u.list_order,
            bookable_time: u.bookable_time,
            block_free_class_until: u.block_free_class_until,
            timezone: u.timezone,
            domain: u.domain,
            manager: u.manager
        };
        this.show.loader.updateProfile = true;
        this.a.xapi.post(up).subscribe(re => {
            this.show.loader.updateProfile = false;
            console.log('admin_user_update', re);
            this.show.loader.profileSaved = true;
            setTimeout(() => this.show.loader.profileSaved = false, 1000);
        }, e => this.a.toast(e));
        return false;
    }
    onClickPointUpdate() {
        this.pointForm.idx_student = this.user.ID;
        this.show.loader.updatePoint = true;
        this.a.lms.point_add(this.pointForm).subscribe(re => {
            console.log('point_add: ', re);
            this.show.loader.updatePoint = false;
            /**
             * This should be javascript plain alert !
             */
            alert('Point update success.');
            this.router.navigateByUrl('/admin/user-info/' + this.user.ID);
        }, e => {
            this.show.loader.updatePoint = false;
            this.a.toast(e);
        });
    }

    loadSchedule(ID) {

        let sql = `
        SELECT r.idx, r.idx_student, r.idx_teacher, r.date, r.class_begin, r.class_end, r.point
        FROM lms_reservation as r, wp_users
        WHERE BRANCH`;
        if ( this.user.user_type === 'T' ) {
            sql += ` AND wp_users.ID = r.idx_teacher AND r.idx_teacher=${ID}`;
        } else {
            sql += ` AND wp_users.ID = r.idx_student AND r.idx_student=${ID}`;
        }
        sql += `
        ORDER BY date DESC, class_begin DESC
        LIMIT ${this.limit}
        `;
        console.log(sql);
        this.show.loader.loadSchedule = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            console.log('schedule: ', re);
            this.show.loader.loadSchedule = false;
            this.sessions = re;
            // this.statistics();
            this.sanitizeSchedule();
            console.log(re);
        }, e => this.a.toast(e));
    }
    sanitizeSchedule() {
        this.count.session.future = 0;
        this.count.session.past = 0;
        if (!this.sessions.length) {
            return;
        }
        for (const session of this.sessions) {
            session.stamp_reserve = this.a.shortDateTime(session.stamp_reserve);
            // if (session.paid !== '0') {
            //     session.paid = <any>'Y';
            // } else {
            //     session.paid = <any>'';
            // }
            // if (session.refund_request_at === '0') {
            //     session.refund_request_at = '';
            // } else {
            //     session.refund_request_at = this.a.shortDateTime(session.refund_request_at);
            // }
            // if (session.refund_reject_at === '0') {
            //     session.refund_reject_at = '';
            // } else {
            //     session.refund_reject_at = this.a.shortDateTime(session.refund_reject_at);
            // }
            // if (session.refund_done_at === '0') {
            //     session.refund_done_at = '';
            // } else {
            //     session.refund_done_at = this.a.shortDateTime(session.refund_done_at);
            // }
            // if (session.refund_settle_at === '0') {
            //     session.refund_settle_at = '';
            // } else {
            //     session.refund_settle_at = this.a.shortDateTime(session.refund_settle_at);
            // }
            const b = this.a.getUserYmdHiFromUTCYmdHi(session.date + session.class_begin);
            session.date = b.substr(0, 8);
            session.class_begin = b.substr(8, 4);

            const e = this.a.getUserYmdHiFromUTCYmdHi(session.date + session.class_end);
            session.class_end = e.substr(8, 4);

            const c = this.a.getYmdHi();
            const currentDateTime = parseInt(c.substr(0, 8), 10);
            const beginDateTime = parseInt(b.substr(0, 8), 10);
            if (currentDateTime < beginDateTime) {
                session['time'] = 'future';
            } else if (currentDateTime === beginDateTime) {
                session['time'] = 'today';
                this.sessionsToday.push(session);
            } else {
                session['time'] = 'past';
            }
            if ( currentDateTime < beginDateTime ) {
                this.count.session.future ++;
            } else {
                this.count.session.past ++;
            }
        }
    }
    loadPayment(ID) {

        let sql = `SELECT p.idx, p.amount, p.currency, p.idx_student, p.payment_method, p.point, p.stamp_begin, p.state
            FROM lms_payment as p, wp_users
            WHERE BRANCH AND wp_users.ID=${ID} AND p.idx_student=${ID}`;
        sql += ` AND (state='approved' OR state='refund') `;
        sql += ` ORDER BY stamp_begin DESC`;
        sql += ` LIMIT 100`;
        console.log(sql);
        this.show.loader.loayPayment = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            console.log('payments: ', re);
            this.show.loader.loayPayment = false;
            this.payments = re;
        }, e => this.a.toast(e));
    }
}

