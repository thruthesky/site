import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XapiFileUploadComponent } from '../../../../components/xapi-file-upload/xapi-file-upload.component';
import { FILES, USER_DATA_RESPONSE, BOOK } from '../../../../modules/xapi/interfaces';
import { AppService } from '../../../../providers/app.service';
import { PAYMENT_RATE } from '../../../../modules/xapi/lms.service';
import { validate } from 'codelyzer/walkerFactory/walkerFn';

interface SHOW {
    loader: {
        loadProfile: boolean;
        updateProfile: boolean;
        updatePoint: boolean;
        profileSaved: boolean;
        loadSchedule: boolean;
        loadPayment: boolean;
        loadFailedPayment: boolean;
        loadPointHistory: boolean;
        totalPointReserved: boolean;
    };
    pointUpdateForm: boolean;
    newPointUpdateForm: boolean;
    failedPayments: boolean;

}
@Component({
    selector: 'admin-user-info-page',
    templateUrl: 'admin-user-info.page.html',
    styleUrls: ['admin-user-info.page.scss'],
})
export class AdminUserInfoPage implements OnInit {

    @ViewChild('profilePhotoUpload') profilePhotoUpload: XapiFileUploadComponent;
    files: FILES = [];
    user: USER_DATA_RESPONSE = {};
    sessions: Array<BOOK> = [];
    sessionsToday: Array<BOOK> = [];
    refundRequests: Array<BOOK> = [];
    count = {
        session: {
            future: 0,
            past: 0
        }
    };
    payments = [];
    failedPayments = [];
    show: SHOW = null;
    pointForm = null;
    limit = 500;

    pointHistory = [];


    paymentRate: PAYMENT_RATE = null;

    total_point_paid = 0;
    total_point_reserve = 0;

    constructor(
        public active: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
        active.paramMap.subscribe(params => {
            const ID = params.get('ID');
            // console.log('params:', ID);
            this.init();
            this.loadInfo(ID);
            this.loadPayment(ID);
        });
        a.lms.payment_rate().subscribe(re => {
            this.paymentRate = re;
            // console.log('paymentRate: ', this.paymentRate);
        }, () => { });

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
                loadPayment: false,
                loadFailedPayment: false,
                loadPointHistory: false,
                totalPointReserved: false
            },
            pointUpdateForm: false,
            newPointUpdateForm: false,
            failedPayments: false
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

        this.count.session.future = 0;
        this.count.session.past = 0;
    }

    loadInfo(ID) {

        this.show.loader.loadProfile = true;
        const sql = `SELECT * FROM wp_users WHERE BRANCH AND ID=${ID}`;
        this.a.lms.admin_query({
            sql: sql,
            session_id: true
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
                 * Some methods are invoked
                 * after loading user information.
                 * since it needs user type.
                 */
                if (this.user.user_type === 'S') {
                    this.loadPointReserved();
                }
                this.loadSchedule(ID);
                this.loadPointHistory();
                this.loadRefundRequest();

            } else {
                this.a.toast('You are not Manager of this user.');
            }
            // console.log('loadInfo', re);

            // this.onClickPointUpdate();
        }, e => this.a.toast(e));
    }
    onSubmitUserInfo() {
        // event.preventDefault();

        // console.log(this.user);
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
            class_software: u.class_software,
            class_software_id: u.class_software_id,
            grade: u.grade,
            user_group: u.user_group,
            list_order: u.list_order,
            bookable_time: u.bookable_time,
            block_free_class_until: u.block_free_class_until,
            timezone: u.timezone,
            // domain: u.domain,
            manager: u.manager,
            skype: u.skype,
            kakaotalk: u.kakaotalk,
            wechat: u.wechat,
            line: u.line,
            qq: u.qq
        };
        this.show.loader.updateProfile = true;
        this.a.xapi.post(up).subscribe(re => {
            this.show.loader.updateProfile = false;
            // console.log('admin_user_update', re);
            this.show.loader.profileSaved = true;
            setTimeout(() => this.show.loader.profileSaved = false, 1000);
            this.a.toast('User information has been updated successfully.');
        }, e => this.a.toast(e));
        return false;
    }
    onClickPointUpdate() {
        this.pointForm.idx_student = this.user.ID;
        this.show.loader.updatePoint = true;
        this.a.lms.point_add(this.pointForm).subscribe(re => {
            // console.log('point_add: ', re);
            this.show.loader.updatePoint = false;
            /**
             * This should be javascript plain alert !
             */
            alert('Point update success.');
            this.router.navigateByUrl('/manager/user-info/' + this.user.ID);
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
        if (this.user.user_type === 'T') {
            sql += ` AND wp_users.ID = r.idx_teacher AND r.idx_teacher=${ID}`;
        } else {
            sql += ` AND wp_users.ID = r.idx_student AND r.idx_student=${ID}`;
        }
        sql += `
        ORDER BY date DESC, class_begin DESC
        LIMIT ${this.limit}
        `;
        // console.log(sql);
        this.show.loader.loadSchedule = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('schedule: ', re);
            this.show.loader.loadSchedule = false;
            this.sessions = re;
            // this.statistics();
            this.sanitizeSchedule();
            // console.log(re);
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
            if (currentDateTime < beginDateTime) {
                this.count.session.future++;
            } else {
                this.count.session.past++;
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
        // console.log(sql);
        this.show.loader.loadPayment = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('payments: ', re);
            this.show.loader.loadPayment = false;
            if ( re ) {
                this.payments = re;
                this.payments.map(v => {
                    if (v.state === 'approved') {
                        this.total_point_paid += parseInt(v.point, 10);
                    } else if (v.state === 'refund') {
                        this.total_point_paid -= parseInt(v.point, 10);
                    }
                });
            }
        }, e => this.a.toast(e));


        sql = `SELECT p.idx, p.amount, p.currency, p.idx_student, p.payment_method, p.point_requested as point, p.stamp_begin, p.state
            FROM lms_payment as p, wp_users
            WHERE BRANCH AND wp_users.ID=${ID} AND p.idx_student=${ID}`;
        sql += ` AND (state<>'approved' AND state<>'refund') `;
        sql += ` ORDER BY stamp_begin DESC`;
        sql += ` LIMIT 20`;
        // console.log(sql);
        this.show.loader.loadFailedPayment = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('payments: ', re);
            this.show.loader.loadFailedPayment = false;
            this.failedPayments = re;
        }, e => this.a.toast(e));

    }
    loadPointHistory() {

        const ID = this.user.ID;
        const type = this.user.user_type;


        let sql = `SELECT p.*
            FROM lms_point_log as p, wp_users
            WHERE BRANCH AND wp_users.ID=${ID}`;
        if (type === 'T') {
            sql += ` AND p.idx_teacher=${ID}`;
        } else {
            sql += ` AND p.idx_student=${ID}`;
        }
        sql += ` ORDER BY stamp DESC`;
        sql += ` LIMIT 300`;
        // console.log('loadPointHistory()', sql);
        this.show.loader.loadPointHistory = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('pointHistory: ', re);
            this.show.loader.loadPointHistory = false;
            this.pointHistory = re;
        }, e => this.a.toast(e));
    }
    loadRefundRequest() {
        let sql = `SELECT r.* FROM lms_reservation as r, wp_users WHERE BRANCH`;
        sql += ` AND wp_users.ID = r.idx_student `;
        if (this.user.user_type === 'T') {
            sql += ` AND r.idx_teacher=${this.user.ID}`;
        } else {
            sql += ` AND r.idx_student=${this.user.ID}`;
        }

        sql += ` AND ( (r.refund_request_at > 0) OR (r.refund_reject_at > 0) )
                    AND refund_done_at = 0
                    AND refund_settle_at = 0
                    AND paid=0 `;
        sql += ` ORDER BY r.date DESC, r.class_begin DESC`;
        sql += ` LIMIT 5`;
        // console.log('sql: ', sql);
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('refund request: ', re);
            this.refundRequests = re;
            if (this.refundRequests && this.refundRequests.length) {
                for (const s of this.refundRequests) {
                    this.a.convertSessionIntoUserTime(s);
                    s.date = s.date.substr(4);
                }
            }
        }, e => this.a.toast(e));
    }


    onSuccessUploadPicture(file) {
        /**
         * Delete previous photo.
         *
         * file[0]
         */
        if (this.files.length > 1) { /// If there are two files, one for prvious photo, the other is for new photo.
            this.profilePhotoUpload.deleteFile(this.files[0], () => this.updatePrimaryPhoto(file), () => this.updatePrimaryPhoto(file));
        } else {
            this.updatePrimaryPhoto(file);
        }


    }


    updatePrimaryPhoto(file) {
        // console.log('file uploaded: ', file);
        this.user.photoURL = file.url;
        this.a.lms.admin_user_profile_photo_update({ ID: this.user.ID, photo_guid: file.url }).subscribe(re => {
            // console.log('admin_user_profile_update: re:', re);
        }, e => this.a.toast(e));
    }

    onClickAutoCompute(): number {
        if (!this.pointForm.payment_method) {
            this.a.toast('Please select payment method.');
            return;
        }
        if (!this.pointForm.currency) {
            this.a.toast('Please select currency by selecting payment method');
            return;
        }
        if (!this.pointForm.amount) {
            this.a.toast('Please input amount');
            return;
        }
        if (!this.paymentRate) {
            this.a.toast('Error: payment_rate information is null');
        }

        const amount = <any>(<string>this.pointForm.amount).replace(',', '').replace(',', '').trim();
        let usd = 0;
        if (this.pointForm.currency === 'USD') {
            /**
             * No buyer rate
             */
            usd = amount * (100 / (100 + this.a.floatval(this.paymentRate.VAT)));
        }

        if (this.pointForm.currency === 'KRW') {
            const krw = amount * (100 / (100 + this.a.floatval(this.paymentRate.VAT)));
            usd = krw / this.a.floatval(this.paymentRate.USD_TO_KRW);
        }

        if (this.pointForm.currency === 'CNY') {
            const cny = amount * (100 / (100 + this.a.floatval(this.paymentRate.VAT)));
            console.log('cny: ', cny);
            usd = cny / this.a.floatval(this.paymentRate.USD_TO_CNY);
        }
        if (this.pointForm.currency === 'JPY') {
            const jpy = amount * (100 / (100 + this.a.floatval(this.paymentRate.VAT)));
            usd = jpy / this.a.floatval(this.paymentRate.USD_TO_JPY);
        }

        this.pointForm.point = Math.round(usd * 1000);
    }

    onClickAutoRefundCompute() {
        if (!this.pointForm.point) {
            this.a.toast('Please input point');
            return;
        }
        if (!this.pointForm.payment_method) {
            this.a.toast('Please select payment method.');
            return;
        }
        if (!this.pointForm.currency) {
            this.a.toast('Please select currency by selecting payment method');
            return;
        }
        if (!this.paymentRate) {
            this.a.toast('Error: payment_rate information is null');
        }

        const point = this.pointForm.point;

        let amount = 0;
        const usd = point / 1000;
        if (this.pointForm.currency === 'USD') {
            /**
             * No buyer rate
             */
            amount = usd + usd * this.a.floatval(this.paymentRate.VAT) / 100;
        }

        if (this.pointForm.currency === 'KRW') {
            const krw = usd * this.a.floatval(this.paymentRate.USD_TO_KRW);
            amount = krw + krw * this.a.floatval(this.paymentRate.VAT) / 100;
            amount = Math.round(amount);
        }

        if (this.pointForm.currency === 'CNY') {
            const cny = usd * this.a.floatval(this.paymentRate.USD_TO_CNY);
            amount = cny + cny * this.a.floatval(this.paymentRate.VAT) / 100;
            amount = Math.round(amount * 100) / 100;
        }
        if (this.pointForm.currency === 'JPY') {
            const jpy = usd * this.a.floatval(this.paymentRate.USD_TO_JPY);
            amount = jpy + jpy * this.a.floatval(this.paymentRate.VAT) / 100;
            amount = Math.round(amount * 100) / 100;
        }

        this.pointForm.amount = amount;
    }

    onClickFailedAmount(pay) {
        this.pointForm.apply = 'payment';
        this.pointForm.amount = pay.amount;
        this.pointForm.currency = pay.currency;
        switch (this.pointForm.currency) {
            case 'USD': this.pointForm.payment_method = 'paypal'; break;
            case 'KRW': this.pointForm.payment_method = 'wooribank'; break;
            case 'CNY': this.pointForm.payment_method = 'chinesebank'; break;
            case 'JPY': this.pointForm.payment_method = 'japanesebank'; break;
            default: return '';
        }
        this.show.newPointUpdateForm = true;
        this.onClickAutoCompute();
    }

    onUserInfoFormSubmit( event ) {
        alert('hi');
        event.preventDefault();

        return false;
    }

    loadPointReserved() {
        // console.log(this.user);
        const sql = `SELECT sum(point) as points
                     FROM lms_reservation
                     WHERE BRANCH AND idx_student=${this.user.ID}
                     GROUP BY idx_student
                     `;
        this.show.loader.totalPointReserved = true;
        this.a.lms.admin_query({
            sql: sql
        }).subscribe(re => {
            // console.log('payments: ', re);
            this.show.loader.totalPointReserved = false;
            if ( re && re.length ) {
                this.total_point_reserve = re[0].points;
            }
        }, e => {
            this.a.toast(e);
            this.show.loader.totalPointReserved = false;
        });
    }
}

