import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BOOK } from '../../../../modules/xapi/interfaces';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-sidebar-component',
    templateUrl: 'admin-sidebar.component.html',
    styleUrls: ['admin-sidebar.component.scss'],
})
export class AdminSidebarComponent implements OnInit {

    pointToday = 0;
    pointThisMonth = 0;
    currentMonth = null;
    payments = [];
    stats = null;

    sessions: Array<BOOK> = [];
    refundRequests: Array<BOOK> = [];
    today = new Date();
    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    alertUnChecked = false;
    alertMark = '';
    alertMarkId;

    /**
     * quick search
     */
    uid = '';

    comments = [];
    constructor(
        public a: AppService,
        public router: Router
    ) {

        this.currentMonth = this.monthNames[this.today.getMonth()];
        // console.log( this.a.user.sessionId );

        this.loadUncheckedSession();
        setInterval(() => this.loadUncheckedSession(), 60 * 1000); /// every minutes.

        this.loadPaymentInfo();
        // setInterval(() => this.loadPaymentInfo(), 30 * 60 * 1000); // 30 mins
        this.loadStatInfo();
        // setInterval(() => this.loadStatInfo(), 60 * 60 * 1000); // 1 hour

        this.loadSessionOnGoing();
        // setInterval(() => this.loadSessionOnGoing(), 60 * 1000); /// every minutes.

        this.loadRefundRequest();

        // check there is a schedule that is not ready yet.
        this.getClassComment();
    }

    ngOnInit() {
    }

    loadPaymentInfo() {
        const sql = `
        SELECT p.idx, p.amount, p.currency, p.idx_student, p.payment_method, p.point, p.stamp_begin, p.state
        FROM lms_payment as p, wp_users
        WHERE BRANCH AND wp_users.ID = p.idx_student AND p.state = 'approved'
        ORDER BY p.idx DESC
        LIMIT 5
        `;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true
        }).subscribe(re => {
            // console.log('payment: ', re);
            this.payments = re;
        }, e => this.a.toast(e));

        const stampToday = this.a.getStampOfToday();
        const sqlToday = `
        SELECT sum(p.point) as point
        FROM lms_payment as p, wp_users
        WHERE BRANCH and wp_users.ID=p.idx_student AND p.state='approved' AND stamp_begin>=${stampToday}
        `;
        this.a.lms.admin_query({ sql: sqlToday }).subscribe(re => {
            // console.log('sum: ', re);
            if (re && re.length && re[0]['point'] ) {
                this.pointToday = re[0]['point'];
            }
        }, e => this.a.toast(e));

        const date_begin = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        const date_end = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1);
        const _date_begin = this.a.getStamp(date_begin);
        const _date_end = this.a.getStamp(date_end);
        // console.log('date_begin', _date_begin);
        // console.log('date_end', _date_end);
        const sqlThisMonth = `
        SELECT sum(p.point) as point
        FROM lms_payment as p, wp_users
        WHERE BRANCH and wp_users.ID=p.idx_student AND p.state='approved' AND stamp_begin BETWEEN ${_date_begin} AND ${_date_end}
        `;
        this.a.lms.admin_query({ sql: sqlThisMonth }).subscribe(re => {
            // console.log('sum: ', re);
            if (re && re.length && re[0]['point'] ) {
                this.pointThisMonth = re[0]['point'];
            }
        }, e => this.a.toast(e));
    }

    loadStatInfo() {
        this.a.xapi.post({
            route: 'lms.admin_stat',
            session_id: this.a.user.sessionId
        }).subscribe(re => {
            // console.log('loadStatInfo::stat: ', re);
            this.stats = re;
            if (this.stats.stat.teachers) {
                const teachers = this.stats.stat.teachers;
                const names = Object.keys(teachers);
                if (names.length) {
                    const data = [];
                    for (const name of names) {
                        data.push({
                            name: name,
                            idx: teachers[name].idx,
                            reserved: teachers[name].reserved,
                            past: teachers[name].past
                        });
                    }
                    data.sort((a, b) => {
                        return b.reserved - a.reserved;
                    });
                    // console.log('teachers: ', data);
                    this.stats.teachers = data;
                }
            }
        }, e => this.a.toast(e));
    }


    loadSessionOnGoing() {

        let sql = `SELECT r.* FROM lms_reservation as r, wp_users WHERE BRANCH AND wp_users.ID = r.idx_student`;
        const u = this.a.getUTCYmdHisFromUserYmdHi(this.a.getYmdHi());
        const date = u.substr(0, 8);
        const Hi = u.substr(8, 4);

        sql += ` AND (r.date > '${date}' OR (r.date>='${date}' AND class_begin>='${Hi}'))`;
        sql += ` ORDER BY r.date ASC, r.class_begin ASC`;
        sql += ` LIMIT 100`;
        // console.log('sql: ', sql);
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('going re: ', re);
            this.sessions = re;
            // this.re = re;
            // this.statistics();
            // this.sanitize();
            // console.log(re);
            if (this.sessions.length) {
                for (const session of this.sessions) {
                    this.a.convertSessionIntoUserTime(session);
                    // const b = this.a.getUserYmdHiFromUTCYmdHi(session.date + session.class_begin);
                    // session.date = b.substr(0, 8);
                    // session.class_begin = b.substr(8, 4);
                }
            }
        }, e => this.a.toast(e));
        return false;
    }
    onSubmitUserQuickSearch(event: Event) {
        event.preventDefault();
        this.router.navigateByUrl('/manager/user/uid/' + this.uid);
        return false;
    }
    loadRefundRequest() {
        let sql = `SELECT r.* FROM lms_reservation as r, wp_users WHERE BRANCH AND wp_users.ID = r.idx_student`;

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

    checkSession(session) {
        if ( session.stamp_checked > 0 || session['alarm_checking']) {
            return;
        }
        this.alertUnChecked = false;
        session['alarm_checking'] = true;
        this.a.lms.session_stamp_checked({idx: session.idx}).subscribe( re => {
            // console.log(re);
            session.stamp_checked = 1;
            this.alertMark = '';
            session['alarm_checking'] = false;
        }, e => {
            this.a.toast(e);
            session['alarm_checking'] = false;
        });
    }

    loadUncheckedSession() {

        let sql = `SELECT r.idx, r.date, r.class_begin, r.class_end, r.stamp_checked FROM lms_reservation as r, wp_users WHERE BRANCH AND wp_users.ID = r.idx_student`;
        const u = this.a.getUTCYmdHisFromUserYmdHi(this.a.getYmdHi());
        const date = u.substr(0, 8);
        const Hi = u.substr(8, 4);

        sql += ` AND r.stamp_checked=0 AND (r.date > '${date}' OR (r.date>='${date}' AND class_begin>='${Hi}'))`;
        sql += ` ORDER BY r.date ASC, r.class_begin ASC`;
        sql += ` LIMIT 1`;
        // console.log('sql: ', sql);
        this.a.lms.admin_query({
            sql: sql
        }).subscribe( re => {
            // console.log('loadUncheckedSession: ', re);

            if (re.length) {
                for (const session of re) {
                    this.a.convertSessionIntoUserTime(session);
                    // const b = this.a.getUserYmdHiFromUTCYmdHi(session.date + session.class_begin);
                    // session.date = b.substr(0, 8);
                    // session.class_begin = b.substr(8, 4);
                    // console.log('uncheckSession::  ', session);

                    const d = new Date();

                    const allow_stamp = d.getTime() + 60 * 60 * 1000;
                    const book_stamp = this.getBookStamp(session);

                    // console.log(`${book_stamp} < ${allow_stamp}` );
                    // console.log(book_stamp <= allow_stamp);
                    // console.log( new Date(book_stamp) );
                    // console.log( new Date(allow_stamp) );

                    if ( book_stamp <= allow_stamp) {
                        this.alertUnChecked = true;
                        this.loadSessionOnGoing();
                        this.alertMark = session.class_begin;
                        this.alertMarkId = session.idx;
                    } else {
                        this.alertUnChecked = false;
                    }
                }
            } else {
                this.alertUnChecked = false;
            }
        }, e => this.a.toast(e));
        return false;
    }

    getBookStamp(session) {

        const Y = parseInt(session.date.substr(0, 4), 10);
        const m = parseInt(session.date.substr(4, 2), 10) - 1;
        const d = parseInt(session.date.substr(6, 2), 10);
        const H = parseInt(session.class_begin.substr(0, 2), 10);
        const i = parseInt(session.class_begin.substr(2, 2), 10);

        const date = new Date(Y, m, d, H, i);
        return date.getTime();
    }

    getClassComment() {
      this.a.lms.get_latest_student_comment_to_teachers({
        limit: 10,
        page: 1,
        maxRate: 3
      }).subscribe(res => {
        // console.log('loadClassComment:: ', res);
        this.comments = res['comments'];
      }, e => {
        this.a.toast(e);
      });

    }


}

