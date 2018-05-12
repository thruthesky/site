import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../providers/app.service';
import { BOOK } from './../../../modules/xapi/interfaces';


@Component({
    selector: 'admin-session-page',
    templateUrl: 'session.page.html',
    styleUrls: ['session.page.scss'],
})
export class SessionPage implements OnInit {
    re: Array<BOOK> = [];
    show = {
        loader: false
    };
    form = {
        idx: '',
        // future: false,
        // past: false,
        date_begin: '20180101',
        date_end: '',
        class_begin: '0000',
        class_end: '2400',
        point_begin: 0,
        point_end: 9999999,
        idx_teacher: '',
        idx_student: '',
        idx_schedule: '',
        stamp_reserve: '',
        paid: false,
        refund_request_at: false,
        refund_reject_at: false,
        refund_done_at: false,
        refund_settle_at: false,
        refund_done_point: false,
        teacher_absent: false,
        student_absent: false,
        successful: false,
        comment: false,
        order: 'DATETIME',
        by: 'ASC',
        limit: 150,
        display: {
            reserved_at: false,
            paid: false,
            refund_request_at: false,
            refund_request_message: false,
            refund_reject_at: false,
            refund_reject_message: false,
            refund_done_at: false,
            refund_done_by: false,
            refund_done_point: false,
            refund_settle_at: false,
            refund_settle_message: false,
            teacher_absent: false,
            student_absent: false,
            successful: false,
            expression: false,
            vocabulary: false,
            grammar: false,
            pronunciation: false,
            speed: false,
            comment: false,
            book_used: false,
            book_next: false
        }
    };
    constructor(
        public a: AppService
    ) {
        const d = (new Date);
        this.form.date_end = d.getFullYear() + a.add0((d.getMonth() + 1)) + a.add0(d.getDate());
        this.onSubmit();
    }
    ngOnInit() {

    }
    onSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        console.log(this.form);

        let sql = `SELECT r.* FROM lms_reservation as r, wp_users WHERE BRANCH AND wp_users.ID = r.idx_student`;
        const where = this.getWhere();
        if (where) {
            sql += ` AND ${where}`;
        }
        sql += this.getOrderBy();
        sql += ` LIMIT ${this.form.limit}`;
        console.log(sql);
        this.show.loader = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            console.log('re: ', re);
            this.show.loader = false;
            this.re = re;
            this.sanitize();
            // this.statistics();
            console.log(re);
        }, e => this.a.toast(e));
        return false;
    }

    sanitize() {
        if ( ! this.re || ! this.re.length ) {
            return;
        }
        for (const session of this.re) {
            session.stamp_reserve = this.a.shortDateTime(session.stamp_reserve);
            if ( session.paid !== '0' ) {
                session.paid = <any>'Y';
            } else {
                session.paid = <any>'';
            }
            if (session.refund_request_at === '0') {
                session.refund_request_at = '';
            } else {
                session.refund_request_at = this.a.shortDateTime(session.refund_request_at);
            }
            if (session.refund_reject_at === '0') {
                session.refund_reject_at = '';
            } else {
                session.refund_reject_at = this.a.shortDateTime(session.refund_reject_at);
            }
            if (session.refund_done_at === '0') {
                session.refund_done_at = '';
            } else {
                session.refund_done_at = this.a.shortDateTime(session.refund_done_at);
            }
            if (session.refund_settle_at === '0') {
                session.refund_settle_at = '';
            } else {
                session.refund_settle_at = this.a.shortDateTime(session.refund_settle_at);
            }
        }
    }

    getWhere() {
        const where: Array<string> = [];

        if (this.form.idx) {
            where.push(`r.idx=${this.form.idx}`);
        }

        if (this.form.idx_teacher) {
            where.push(`r.idx_teacher=${this.form.idx_teacher}`);
        }

        if (this.form.idx_student) {
            where.push(`r.idx_student=${this.form.idx_student}`);
        }

        if (this.form.idx_schedule) {
            where.push(`r.idx_schedule=${this.form.idx_schedule}`);
        }


        if (this.form.point_begin) {
            where.push(`r.point>=${this.form.point_begin}`);
        }
        if (this.form.point_end) {
            where.push(`r.point<=${this.form.point_end}`);
        }

        if (this.form.paid) {
            where.push(`r.paid > 0`);
        }

        if (this.form.refund_done_at) {
            where.push(`r.refund_done_at>0`);
        }
        if (this.form.refund_done_point) {
            where.push(`r.refund_done_point>0`);
        }
        if (this.form.refund_request_at) {
            where.push(`r.refund_request_at>0`);
        }
        if (this.form.refund_reject_at) {
            where.push(`r.refund_reject_at>0`);
        }
        if (this.form.refund_settle_at) {
            where.push(`r.refund_settle_at>0`);
        }
        if (this.form.teacher_absent) {
            where.push(`r.teacher_absent='y`);
        }
        if (this.form.student_absent) {
            where.push(`r.student_absent='y'`);
        }
        if (this.form.successful) {
            where.push(`r.successful='y'`);
        }
        if (this.form.comment) {
            where.push(`r.comment<>''`);
        }

        const YmdHiBegin = this.form.date_begin + this.form.class_begin;
        if (YmdHiBegin) {
            // const b = this.a.getUTCYmdHisFromUserYmdHi(this.form.date_begin + this.form.class_begin);
            const date_begin = this.a.getUTCYmd(YmdHiBegin);
            const class_begin = this.a.getUTCHi(YmdHiBegin);
            where.push(` r.date>'${date_begin}' OR ( r.date>='${date_begin}' AND r.class_begin>='${class_begin}') `);
        }
        const YmdHiEnd = this.form.date_end + this.form.class_end;
        if (YmdHiEnd) {
            const date_end = this.a.getUTCYmd(YmdHiEnd);
            const class_end = this.a.getUTCHi(YmdHiEnd);
            where.push(` r.date<'${date_end}' OR ( r.date<='${date_end}' AND r.class_begin<='${class_end}') `);
        }
        // console.log('begin: ', b);

        // const e = this.a.getUTCYmdHisFromUserYmdHi(this.form.date_end + this.form.class_end);
        // console.log('end: ', e);


        // this.a.getDateOfTimezone( d, this.a.getUserTimezone());

        // this.a.getUTCDateFromYmdHi(this.form.date_begin + this.form.class_begin);
        if (where.length) {
            return '( ' + where.join(') AND ( ') + ')';
        } else {
            return '';
        }

    }
    getOrderBy() {
        if (this.form.order === 'DATETIME') {
            return `
            ORDER BY date ${this.form.by}, class_begin ${this.form.by}
            `;
        } else {
            return `ORDER BY ${this.form.order} ${this.form.by}`;
        }
    }
    onClickFuture() {
        this.form.date_end = '';
        this.form.class_end = '';
        this.form.date_begin = this.a.getYmd();
        this.form.class_begin = this.a.getHi();
        // const YmdHi = this.form.date_begin + this.form.class_begin;
        // this.form.date_begin = this.a.getUTCYmd( YmdHi );
        // this.form.class_begin = this.a.getUTCHi( YmdHi );
        this.form.order = 'DATETIME';
        this.form.by = 'ASC';

        const d = this.form.display;
        d.book_next = false;
        d.book_used = false;
        d.comment = false;
        d.expression = false;
        d.grammar = false;
        d.paid = false;
        d.pronunciation = false;
        d.refund_done_at = false;
        d.refund_done_by = false;
        d.refund_done_point = false;
        d.refund_reject_at = false;
        d.refund_reject_message = false;
        d.refund_request_at = false;
        d.refund_request_message = false;
        d.refund_settle_at = false;
        d.refund_settle_message = false;
        d.reserved_at = false;
        d.speed = false;
        d.student_absent = false;
        d.successful = false;
        d.teacher_absent = false;
        d.vocabulary = false;
    }
    onClickPast() {
        this.form.date_end = this.a.getYmd();
        this.form.class_end = this.a.getHi();
        this.form.date_begin = '';
        this.form.class_begin = '';
        this.form.order = 'DATETIME';
        this.form.by = 'DESC';


        const d = this.form.display;
        d.book_next = true;
        d.book_used = true;
        d.comment = true;
        d.expression = true;
        d.grammar = true;
        d.paid = true;
        d.pronunciation = true;
        d.refund_done_at = true;
        d.refund_done_by = true;
        d.refund_done_point = true;
        d.refund_reject_at = true;
        d.refund_reject_message = true;
        d.refund_request_at = true;
        d.refund_request_message = true;
        d.refund_settle_at = true;
        d.refund_settle_message = true;
        d.reserved_at = true;
        d.speed = true;
        d.student_absent = true;
        d.successful = true;
        d.teacher_absent = true;
        d.vocabulary = true;
    }
}

