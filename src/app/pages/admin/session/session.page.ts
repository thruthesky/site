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
        limit: 150
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
        const select = 'ID, user_email, display_name, user_registered, phone_number, kakaotalk_id, grade, bookable_time, list_order, timezone, domain, manager, point, gender, user_type';
        const where = this.getWhere();
        let sql = `SELECT ${select} FROM wp_users WHERE BRANCH`;
        if (where) {
            sql += ` AND ${where}`;
        }
        sql += this.getOrderBy();
        sql += ` LIMIT ${this.form.limit}`;
        console.log(sql);
        this.show.loader = true;
        this.a.lms.admin_query({
            sql: sql,
        }).subscribe(re => {
            this.show.loader = false;
            this.re = re;
            // this.sanitize();
            // this.statistics();
            console.log(re);
        }, e => this.a.toast(e));
        return false;
    }

    getWhere() {
        const where: Array<string> = [];

        if (this.form.idx) {
            where.push(`idx=${this.form.idx}`);
        }

        if (this.form.idx_teacher) {
            where.push(`idx_teacher=${this.form.idx_teacher}`);
        }

        if (this.form.idx_student) {
            where.push(`idx_student=${this.form.idx_student}`);
        }

        if (this.form.idx_schedule) {
            where.push(`idx_schedule=${this.form.idx_schedule}`);
        }


        if (this.form.point_begin) {
            where.push(`point>=${this.form.point_begin}`);
        }
        if (this.form.point_end) {
            where.push(`point<=${this.form.point_end}`);
        }

        if ( this.form.paid ) {
            where.push(`paid > 0`);
        }

        if ( this.form.refund_done_at ) {
            where.push(`refund_done_at>0`);
        }
        if ( this.form.refund_done_point ) {
            where.push(`refund_done_point>0`);
        }
        if ( this.form.refund_request_at ) {
            where.push(`refund_request_at>0`);
        }
        if ( this.form.refund_reject_at ) {
            where.push(`refund_reject_at>0`);
        }
        if ( this.form.refund_settle_at ) {
            where.push(`refund_settle_at>0`);
        }
        if ( this.form.teacher_absent ) {
            where.push(`teacher_absent='Y'`);
        }
        if ( this.form.student_absent ) {
            where.push(`student_absent='Y'`);
        }
        if ( this.form.successful ) {
            where.push(`successful='Y'`);
        }
        if ( this.form.comment ) {
            where.push(`comment<>''`);
        }

        const b = this.a.getUTCYmdHisFromUserYmdHi(this.form.date_begin + this.form.class_begin);
        // console.log('begin: ', b);

        const e = this.a.getUTCYmdHisFromUserYmdHi(this.form.date_end + this.form.class_end);
        // console.log('end: ', e);


        // this.a.getDateOfTimezone( d, this.a.getUserTimezone());

        // this.a.getUTCDateFromYmdHi(this.form.date_begin + this.form.class_begin);
        if (where.length) {
            return '(' + where.join(') AND (') + ')';
        } else {
            return '';
        }

    }
    getOrderBy() {
        if ( this.form.order === 'DATETIME' ) {
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
    }
    onClickPast() {
        this.form.date_end = this.a.getYmd();
        this.form.class_end = this.a.getHi();
        this.form.date_begin = '';
        this.form.class_begin = '';
    }
}

