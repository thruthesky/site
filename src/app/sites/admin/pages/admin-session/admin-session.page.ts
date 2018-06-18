import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { BOOK } from '../../../../modules/xapi/interfaces';
import { ActivatedRoute } from '@angular/router';


interface STAT {
    dateOfDailyReservation: string[];
    dailyReservation: {};
    dateOfDailyFreeclass: string[];
    dailyFreeclass: {};
    dateOfDailyPoint: string[];
    dailyPoint: {};
    nameOfTeacherReservation: string[];
    teacherReservation: {};
    nameOfStudentReservation: string[];
    studentReservation: {};
    nameOfTeacherRefundRequest: string[];
    teacherRefundRequest: {};
    nameOfStudentRefundRequest: string[];
    studentRefundRequest: {};
    nameOfTeacherRefundReject: string[];
    teacherRefundReject: {};
    nameOfTeacherRefundDone: string[];
    teacherRefundDone: {};
}


@Component({
    selector: 'admin-session-page',
    templateUrl: 'admin-session.page.html',
    styleUrls: ['admin-session.page.scss']
})
export class AdminSessionPage implements OnInit {

    re: Array<BOOK> = [];
    stat: STAT = <any>{};
    show = {
        loader: false,
        stat: false
    };
    form = {
        idx: '',
        // future: false,
        // past: false,
        date_begin: '',
        date_end: '',
        class_begin: '',
        class_end: '',
        point_begin: '',
        point_end: '',
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
        stamp_checked: false,
        stamp_unchecked: false,
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
            book_next: false,
            stamp_checked: false
        }
    };

    constructor(
        public a: AppService,
        public activated: ActivatedRoute
    ) {
        const d = (new Date);


        activated.paramMap.subscribe(params => {
            // console.log('params: ', params);

            if (params.get('type') === 'student') {
                this.form.idx_student = params.get('ID');
                this.form.date_end = d.getFullYear() + a.add0((d.getMonth() + 1)) + a.add0(d.getDate());
                this.onClickFuture();
            } else if (params.get('type') === 'teacher') {
                this.form.idx_teacher = params.get('ID');
                this.form.date_end = d.getFullYear() + a.add0((d.getMonth() + 1)) + a.add0(d.getDate());
                this.onClickFuture();
            } else if ( params.get('type') === 'idx' ) {
                this.form.idx = params.get('ID');
                this.onSubmit();
            } else {
                this.onClickFuture();
            }
        });
    }

    ngOnInit() { }

    init() {
        this.re = [];
        this.stat = {
            dateOfDailyReservation: [],
            dailyReservation: {},
            dateOfDailyFreeclass: [],
            dailyFreeclass: {},
            dateOfDailyPoint: [],
            dailyPoint: {},
            nameOfTeacherReservation: [],
            teacherReservation: {},
            nameOfStudentReservation: [],
            studentReservation: {},
            nameOfTeacherRefundRequest: [],
            teacherRefundRequest: {},
            nameOfStudentRefundRequest: [],
            studentRefundRequest: {},
            nameOfTeacherRefundReject: [],
            teacherRefundReject: {},
            nameOfTeacherRefundDone: [],
            teacherRefundDone: {},
        };
    }

    onSubmit(event?: Event) {
        this.init();
        if (event) {
            event.preventDefault();
        }
        // console.log('form:', this.form);

        let sql = `SELECT r.* FROM lms_reservation as r, wp_users WHERE BRANCH AND wp_users.ID = r.idx_student`;
        const where = this.getWhere();
        if (where) {
            sql += ` AND ${where}`;
        }
        sql += this.getOrderBy();
        sql += ` LIMIT ${this.form.limit}`;
        // console.log(sql);
        this.show.loader = true;
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('re: ', re);
            this.show.loader = false;
            this.re = re;
            this.statistics();
            this.sanitize();
            // console.log(re);
        }, e => this.a.toast(e));
        return false;
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

        if (this.form.stamp_checked) {
            where.push(`r.stamp_checked>0`);
        }

        if (this.form.stamp_unchecked) {
            where.push(`r.stamp_checked=0`);
        }


        if (this.form.date_begin) {
            let YmdHiBegin;
            if (this.form.class_begin) {
                YmdHiBegin = this.form.date_begin + this.form.class_begin;
            } else {
                YmdHiBegin = this.form.date_begin + '0000';
            }
            const date_begin = this.a.getUTCYmd(YmdHiBegin);
            const class_begin = this.a.getUTCHi(YmdHiBegin);
            where.push(` r.date>'${date_begin}' OR ( r.date>='${date_begin}' AND r.class_begin>='${class_begin}') `);
        } else {
            if (this.form.class_begin) {
                const class_begin = this.a.getUTCHi('20180101' + this.form.class_begin);
                where.push(` r.class_begin>=${class_begin}`);
            }
        }

        if (this.form.date_end) {
            let YmdHi;
            if (this.form.class_end) {
                YmdHi = this.form.date_end + this.form.class_end;
            } else {
                YmdHi = this.form.date_end + '0000';
            }
            const date = this.a.getUTCYmd(YmdHi);
            const time = this.a.getUTCHi(YmdHi);
            where.push(` r.date<'${date}' OR ( r.date<='${date}' AND r.class_begin<='${time}') `);
        } else {
            if (this.form.class_end) {
                const time = this.a.getUTCHi('21001230' + this.form.class_end);
                where.push(` r.class_end<=${time}`);
            }
        }

        // let begin = '0000';
        // if ( this.form.class_begin ) {
        //     begin = this.form.class_begin;
        // }

        // const YmdHiBegin = this.form.date_begin + begin;
        // if (YmdHiBegin) {
        //     // const b = this.a.getUTCYmdHisFromUserYmdHi(this.form.date_begin + this.form.class_begin);
        //     const date_begin = this.a.getUTCYmd(YmdHiBegin);
        //     const class_begin = this.a.getUTCHi(YmdHiBegin);
        //     where.push(` r.date>'${date_begin}' OR ( r.date>='${date_begin}' AND r.class_begin>='${class_begin}') `);
        // }

        // let end = '2400';
        // if ( this.form.class_end ) {
        //     end = this.form.class_end;
        // }
        // const YmdHiEnd = this.form.date_end + end;
        // if (YmdHiEnd) {
        //     const date_end = this.a.getUTCYmd(YmdHiEnd);
        //     const class_end = this.a.getUTCHi(YmdHiEnd);
        //     where.push(` r.date<'${date_end}' OR ( r.date<='${date_end}' AND r.class_begin<='${class_end}') `);
        // }
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
        this.onSubmit();
    }
    onClickPast() {
        this.form.date_end = this.a.getYmd();
        this.form.class_end = this.a.getHi();
        this.form.date_begin = '';
        this.form.class_begin = '';
        this.form.order = 'DATETIME';
        this.form.by = 'DESC';


        const d = this.form.display;
        // d.book_next = true;
        // d.book_used = true;
        // d.comment = true;
        // d.expression = true;
        // d.grammar = true;
        d.paid = true;
        // d.pronunciation = true;
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
        // d.speed = true;
        d.student_absent = true;
        d.successful = true;
        d.teacher_absent = true;
        // d.vocabulary = true;

        this.onSubmit();
    }

    statistics() {
        if (!this.re) {
            return false;
        }

        for (const session of this.re) {
            //
            if (this.stat.dailyReservation[session.date]) {
                this.stat.dailyReservation[session.date]++;
            } else {
                this.stat.dailyReservation[session.date] = 1;
            }
            //
            if (session.point === '0') {
                if (this.stat.dailyFreeclass[session.date]) {
                    this.stat.dailyFreeclass[session.date]++;
                } else {
                    this.stat.dailyFreeclass[session.date] = 1;
                }
            }
            //
            if (this.stat.dailyPoint[session.date]) {
                this.stat.dailyPoint[session.date] += parseInt(session.point, 10);
            } else {
                this.stat.dailyPoint[session.date] = parseInt(session.point, 10);
            }
            if (session.teacher) {
                if (this.stat.teacherReservation[session.teacher.display_name]) {
                    this.stat.teacherReservation[session.teacher.display_name]++;
                } else {
                    this.stat.teacherReservation[session.teacher.display_name] = 1;
                }

                if (session.refund_reject_at !== '0') {
                    if (this.stat.teacherRefundReject[session.teacher.display_name]) {
                        this.stat.teacherRefundReject[session.teacher.display_name]++;
                    } else {
                        this.stat.teacherRefundReject[session.teacher.display_name] = 1;
                    }
                }
                if (session.refund_done_at !== '0') {
                    if (this.stat.teacherRefundDone[session.teacher.display_name]) {
                        this.stat.teacherRefundDone[session.teacher.display_name]++;
                    } else {
                        this.stat.teacherRefundDone[session.teacher.display_name] = 1;
                    }
                }
            }
            if (session.student) {
                const name = `${session.student.display_name}(${session.student.name})`;
                if (this.stat.studentReservation[name]) {
                    this.stat.studentReservation[name]++;
                } else {
                    this.stat.studentReservation[name] = 1;
                }
            }
            // refund request for student and teacher
            // console.log('session.refund: ', session.refund_request_at);
            if (session.refund_request_at !== '0') {
                if (session.student) {
                    const studentName = `${session.student.display_name}(${session.student.name})`;
                    if (this.stat.studentRefundRequest[studentName]) {
                        this.stat.studentRefundRequest[studentName]++;
                    } else {
                        this.stat.studentRefundRequest[studentName] = 1;
                    }
                }
                if (session.student) {
                    const teacherName = `${session.teacher.display_name}(${session.teacher.name})`;
                    if (this.stat.teacherRefundRequest[teacherName]) {
                        this.stat.teacherRefundRequest[teacherName]++;
                    } else {
                        this.stat.teacherRefundRequest[teacherName] = 1;
                    }
                }
            }
        }
        this.stat.dateOfDailyReservation = Object.keys(this.stat.dailyReservation);
        this.stat.dateOfDailyFreeclass = Object.keys(this.stat.dailyFreeclass);
        this.stat.dateOfDailyPoint = Object.keys(this.stat.dailyPoint);
        this.stat.nameOfTeacherReservation = Object.keys(this.stat.teacherReservation);
        this.stat.nameOfStudentReservation = Object.keys(this.stat.studentReservation);
        this.stat.nameOfTeacherRefundRequest = Object.keys(this.stat.teacherRefundRequest);
        this.stat.nameOfStudentRefundRequest = Object.keys(this.stat.studentRefundRequest);
        this.stat.nameOfTeacherRefundReject = Object.keys(this.stat.teacherRefundReject);
        this.stat.nameOfTeacherRefundDone = Object.keys(this.stat.teacherRefundDone);

        // console.log('stat:', this.stat);
    }

    sanitize() {
        if (!this.re || !this.re.length) {
            return;
        }
        for (const session of this.re) {
            session.stamp_reserve = this.a.shortDateTime(session.stamp_reserve);
            if (session.paid !== '0') {
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
            const b = this.a.getUserYmdHiFromUTCYmdHi(session.date + session.class_begin);
            session.date = b.substr(0, 8);
            session.class_begin = b.substr(8, 4);

            const e = this.a.getUserYmdHiFromUTCYmdHi(session.date + session.class_end);
            session.class_end = e.substr(8, 4);
        }
    }
}



