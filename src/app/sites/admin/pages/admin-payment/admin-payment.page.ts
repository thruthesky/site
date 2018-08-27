import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';

interface STAT {
    studentName: string[];
    student: {
        [name: string]: {
            count: number;
            point: number;
            idx: number;
        };
    };
    point: number;
    krw: number;
    usd: number;
    refund: number;
    success: number;
    fail: number;
    dailyDates: string[];
    daily: {
        [date: string]: number;
    };
}

@Component({
    selector: 'admin-payment-page',
    templateUrl: 'admin-payment.page.html',
    styleUrls: ['admin-payment.page.scss']
})

export class AdminPaymentPage implements OnInit {

    re = [];
    form = {
        date_begin: '',
        date_end: '',
        state: 'approved',
        idx_student: '',
        payment_method: '',
        order: 'stamp_begin',
        by: 'DESC',
        limit: 500
    };
    show = {
        loader: false,
        stat: false
    };
    stat: STAT;

    domains: any = {};

    constructor(public a: AppService,
                public router: Router,
                public activated: ActivatedRoute) {
        activated.paramMap.subscribe(params => {
            if (params.get('ID')) {
                this.form.idx_student = params.get('ID');
            } else {
                const d = new Date();
                this.form.date_begin = d.getFullYear() + '-' + a.add0(d.getMonth() + 1) + '-' + '01';
                this.form.date_end = d.getFullYear() + '-' + a.add0(d.getMonth() + 1) + '-' + a.add0(d.getDate());
            }
            this.onSubmit();
        });
    }

    ngOnInit() {
    }

    init() {
        this.re = [];
        this.stat = {
            studentName: [],
            student: {},
            point: 0,
            krw: 0,
            usd: 0,
            refund: 0,
            success: 0,
            fail: 0,
            daily: {},
            dailyDates: []
        };
        this.domains = {};
    }

    onSubmit(event?: Event) {
        this.init();
        if (event) {
            event.preventDefault();
        }
        // console.log('form:', this.form);

        let sql = `SELECT p.idx, p.amount, p.currency, p.idx_student, p.payment_method, p.point, p.stamp_begin, p.state FROM lms_payment as p, wp_users WHERE BRANCH AND wp_users.ID = p.idx_student`;
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

    getWhere(): string {
        const where: Array<string> = [];
        if (this.form.idx_student) {
            where.push(`p.idx_student=${this.form.idx_student}`);
        }
        if (this.form.payment_method) {
            where.push(`p.payment_method='${this.form.payment_method}'`);
        }
        if (this.form.date_begin) {
            // console.log('date_begin: ', this.form.date_begin);
            // console.log('ymdhi: ', this.a.getYmdHi( new Date(this.form.date_begin) ));
            // console.log(new Date(this.form.date_begin));
            const begin_stamp = new Date(this.form.date_begin).getTime() / 1000;
            where.push(`p.stamp_begin>=${begin_stamp}`);
        }
        if (this.form.date_end) {
            // console.log(new Date(this.form.date_end));
            const stamp = Math.round(new Date(this.form.date_end).getTime() / 1000) + 60 * 60 * 24;
            where.push(`p.stamp_begin<=${stamp}`);
        }

        // if (this.form.success) {
        //     where.push(`p.state='approved'`);
        // }
        // if (this.form.fail) {
        //     where.push(`p.state<>'approved'`);
        // }

        // if (this.form.refund) {
        //     where.push(`p.state='refund'`);
        // }

        if (this.form.state !== 'all') {
            where.push(`p.state='${this.form.state}'`);
        }

        if (where.length) {
            return '( ' + where.join(') AND ( ') + ')';
        } else {
            return '';
        }
    }


    getOrderBy(): string {
        return ` ORDER BY ${this.form.order} ${this.form.by}`;
    }

    statistics() {
        if (!this.re.length) {
            return;
        }
        for (const pay of this.re) {
            if (pay.student) {
                if (pay.state === 'approved') {
                    this.stat.success++;
                    this.stat.point += parseInt(pay.point, 10);
                    if ((<string>pay.currency).toLowerCase() === 'usd') {
                        this.stat.usd += parseFloat(pay.amount);
                    } else if ((<string>pay.currency).toLowerCase() === 'krw') {
                        this.stat.krw += parseInt(pay.amount, 10);
                    }
                    const n = `${pay.student.display_name}(${pay.student.name})`;
                    if (this.stat.student[n]) {
                        this.stat.student[n].count++;
                        this.stat.student[n].point += parseInt(pay.point, 10);
                    } else {
                        this.stat.student[n] = {
                            count: 1,
                            point: parseInt(pay.point, 10),
                            idx: pay.student.idx
                        };
                    }
                    const date = this.a.shortDate(pay.stamp_begin, true);
                    // console.log('pay.stamp_begin', pay.stamp_begin, date);
                    if (this.stat.daily[date]) {
                        this.stat.daily[date] += parseInt(pay.point, 10);
                    } else {
                        this.stat.daily[date] = parseInt(pay.point, 10);
                    }
                    if (!this.domains[pay.student.domain]) {
                        this.domains[pay.student.domain] = {
                            state: {},
                            total_point: 0,
                        };
                    }
                    if (!this.domains[pay.student.domain]['state']['approved']) {
                        this.domains[pay.student.domain]['state']['approved'] = {
                            count: 0,
                            currency: {},
                            point: {}
                        };

                    }

                    if (!this.domains[pay.student.domain]['state']['approved']['currency'][pay.currency]) {
                        this.domains[pay.student.domain]['state']['approved']['currency'][pay.currency] = 0;
                        this.domains[pay.student.domain]['state']['approved']['point'][pay.currency] = 0;
                    }
                    this.domains[pay.student.domain]['state']['approved']['currency'][pay.currency] += parseFloat(pay.amount);
                    this.domains[pay.student.domain]['state']['approved']['point'][pay.currency] += parseInt(pay.point, 10);
                    this.domains[pay.student.domain]['total_point'] += parseInt(pay.point, 10);
                    this.domains[pay.student.domain]['state']['approved']['count']++;


                } else if (pay.state === 'refund') {
                    if (this.stat.refund) {
                        this.stat.refund += parseInt(pay.point, 10);
                    } else {
                        this.stat.refund = parseInt(pay.point, 10);
                    }

                    if (!this.domains[pay.student.domain]) {
                        this.domains[pay.student.domain] = {
                            state: {},
                            total_point: 0
                        };
                    }
                    if (!this.domains[pay.student.domain]['state']['refund']) {
                        this.domains[pay.student.domain]['state']['refund'] = {
                            count: 0,
                            currency: {},
                            point: {}
                        };

                    }

                    if (!this.domains[pay.student.domain]['state']['refund']['currency'][pay.currency]) {
                        this.domains[pay.student.domain]['state']['refund']['currency'][pay.currency] = 0;
                        this.domains[pay.student.domain]['state']['refund']['point'][pay.currency] = 0;
                    }
                    this.domains[pay.student.domain]['state']['refund']['currency'][pay.currency] += parseFloat(pay.amount);
                    this.domains[pay.student.domain]['state']['refund']['point'][pay.currency] += parseInt(pay.point, 10);
                    this.domains[pay.student.domain]['total_point'] -= parseInt(pay.point, 10);
                    this.domains[pay.student.domain]['state']['refund']['count']++;

                } else {
                    this.stat.fail++;
                }
            }



        }
        // console.log('domains', this.domains);
        // console.log('this.stat.daily::' , this.stat.daily);
        this.stat.dailyDates = Object.keys(this.stat.daily).sort().reverse();
        this.stat.studentName = Object.keys(this.stat.student);
        if (this.stat.usd) {
            this.stat.usd = Math.round(this.stat.usd);
        }

    }

    sanitize() {

    }

    color(point) {
        const a = Math.round(point / 100000);
        if (a < 3) {
            return 'grey';
        } else if (a < 5) {
            return 'blue';
        } else if (a < 7) {
            return 'orange';
        }
        return 'red';
    }

    onClickStudent(idx) {
        this.form.idx_student = idx;
        this.form.date_begin = '';
        this.form.date_end = '';
        this.onSubmit();
    }
}



