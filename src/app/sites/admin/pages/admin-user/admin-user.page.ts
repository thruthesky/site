import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface AdminUserStatistics {
    daily_registration: {
        keys: Array<string>;
        data: {};
    };
    studnet: number;
    teacher: number;
    domain: {
        [domain: string]: number;
    };
    timezone: {
        [timezone: string]: number;
    };
}

@Component({
    selector: 'admin-user-page',
    templateUrl: 'admin-user.page.html',
    styleUrls: ['admin-user.page.scss']
})
export class AdminUserPage implements OnInit {

    re = null;
    stat: AdminUserStatistics = <any>{};
    form = {
        name: '',
        male: '',
        female: '',
        student: '',
        teacher: '',
        point_begin: 0,
        point_end: 9999999,
        limit: 150,
        date_begin: '0000-00-00',
        date_end: '',
        domain: '',
        manager: '',
        grade_begin: 0,
        grade_end: 99,
        list_order_begin: 0,
        list_order_end: 999,
        bookable_time_begin: 0,
        bookable_time_end: 0,
        timezone: '',
        order: 'ID',
        by: 'DESC',
        display: {
            ID: true,
            phone_number: true,
            grade: false,
            bookable_time: false,
            list_order: false,
            timezone: false,
            domain: false,
            manager: false,
            stat: {
                count_result: true,
                count_daily_registration: true,
                // count_monthly_registration: false,
                count_domain: false,
                count_timezone: false,
                count_user_type: true
            }
        }
    };
    show = {
        loader: false
    };


    quickSearch = false;
    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {

        activated.paramMap.subscribe( params => {
            if ( params.get('field') === 'uid' ) {
                this.quickSearch = true;
                this.form.name = params.get('value');
                this.onSubmit();
            } else {
                const d = (new Date);
                // this.form.date_end = d.getFullYear() + '-' + a.add0((d.getMonth() + 1)) + '-' + a.add0(d.getDate());
                this.onSubmit();
            }
        });
    }

    ngOnInit() { }

    init() {
        this.re = null;
        this.stat = {
            daily_registration: {
                keys: [],
                data: {}
            },
            studnet: 0,
            teacher: 0,
            domain: {},
            timezone: {}
        };
    }

    onSubmit(event?: Event) {
        /**
         * Initialize
         */
        this.init();
        if (event) {
            event.preventDefault();
        }
        // console.log(this.form);
        const select = 'ID, user_email, display_name, name, user_registered, phone_number, kakaotalk, skype, wechat, line, qq, class_software, class_software_id, grade, bookable_time, list_order, timezone, domain, manager, point, gender, user_type';
        const where = this.getWhere();
        let sql = `SELECT ${select} FROM wp_users WHERE BRANCH`;
        if (where) {
            sql += ` AND ${where}`;
        }
        sql += ` ORDER BY ${this.form.order} ${this.form.by}`;
        sql += ` LIMIT ${this.form.limit}`;
        // console.log('onSubmit:sql', sql);
        this.show.loader = true;
        this.a.lms.admin_query({
            sql: sql,
            no_of_reservations: true,
            session_id: true
        }).subscribe(re => {
            this.show.loader = false;
            this.re = re;
            if ( re.length && re.length === 1 && this.quickSearch ) {
                this.router.navigateByUrl('/manager/user-info/' + this.re[0]['ID'] );
            }
            this.sanitize();
            this.statistics();
            // console.log('onSubmit', re);
        }, e => this.a.toast(e));
        return false;
    }

    getWhere() {
        const where: Array<string> = [];

        if (this.form.name) {
            const n = this.form.name.trim();
            if (isNaN(<any>n)) {
                where.push(`name LIKE '${n}%' OR user_email LIKE '${n}%' OR display_name LIKE '${n}%' OR kakaotalk LIKE '${n}%' OR skype LIKE '${n}%' OR wechat LIKE '${n}%' OR line LIKE '${n}%' OR qq LIKE '${n}%' OR class_software_id LIKE '${n}%'`);
            } else {
                where.push(`ID=${n}`);
            }
        }
        /**
         * Both or one of them.
         */
        if (this.form.student && this.form.teacher) {
        } else if (this.form.student) {
            where.push(`user_type='S' OR user_type=''`);
        } else if (this.form.teacher) {
            where.push(`user_type='T'`);
        }
        if (this.form.male && this.form.female) {
        } else if (this.form.male) {
            where.push(`gender='M'`);
        } else if (this.form.female) {
            where.push(`gender='F'`);
        }
        if (this.form.point_begin) {
            where.push(`point>=${this.form.point_begin}`);
        }
        if (this.form.point_end) {
            where.push(`point<=${this.form.point_end}`);
        }
        if (this.form.grade_begin) {
            where.push(`grade>=${this.form.grade_begin}`);
        }
        if (this.form.grade_end) {
            where.push(`grade<=${this.form.grade_end}`);
        }
        if (this.form.list_order_begin) {
            where.push(`list_order>=${this.form.list_order_begin}`);
        }
        if (this.form.list_order_end) {
            where.push(`list_order<=${this.form.list_order_end}`);
        }
        if (this.form.bookable_time_begin) {
            where.push(`bookable_time>=${this.form.bookable_time_begin}`);
        }
        if (this.form.bookable_time_end) {
            where.push(`bookable_time<=${this.form.bookable_time_end}`);
        }
        if (this.form.date_begin) {
            where.push(`DATE(user_registered)>='${this.form.date_begin}'`);
        }
        if (this.form.date_end) {
            where.push(`DATE(user_registered)<='${this.form.date_end}'`);
        }
        if (this.form.timezone) {
            where.push(`timezone='${this.form.timezone}'`);
        }
        if (this.form.domain) {
            where.push(`domain='${this.form.domain}'`);
        }
        if (this.form.manager) {
            where.push(`manager<>''`);
        }

        if (where.length) {
            return '(' + where.join(') AND (') + ')';
        } else {
            return '';
        }

    }
    sanitize() {
        if (!this.re) {
            return;
        }
        for (const user of this.re) {
            user.date = user.user_registered.substr(0, user.user_registered.indexOf(' '));
            user.date = user.date.substr(5);
        }
    }


    onChangeSelectOrder(event) {
        const value = event.target.value;
        // console.log('onChangeSelectorOrder: ', value);
        this.form.order = value;
    }
    statistics() {
        if (!this.re) {
            return false;
        }

        for (const user of this.re) {
            /**
             * daily registration
             */
            if (this.stat.daily_registration.data[user.date]) {
                this.stat.daily_registration.data[user.date]++;
            } else {
                this.stat.daily_registration.data[user.date] = 1;
            }
            /**
             * User type
             */
            if (user.user_type === 'T') {
                this.stat.teacher++;
            } else {
                this.stat.studnet++;
            }
            /**
             * Domain
             */
            if (this.stat.domain[user.domain]) {
                this.stat.domain[user.domain]++;
            } else {
                this.stat.domain[user.domain] = 1;
            }
            /**
             * Timezone
             */
            if (this.stat.timezone[user.timezone]) {
                this.stat.timezone[user.timezone]++;
            } else {
                this.stat.timezone[user.timezone] = 1;
            }
        }
        this.stat.daily_registration.keys = Object.keys(this.stat.daily_registration.data).sort().reverse();
        /**
         * pop out the last day since the data for the last day is incomplete.
         */
        if (this.stat.daily_registration.keys.length) {
            this.stat.daily_registration.keys.pop();
        }
    }

    shortDate(date: string) {
        if (date && date.length === 10) {
            return date.substr(date.indexOf('-') + 1);
        }
    }
    dailyColor(count) {
        if (count < 15) {
            return 'black';
        } else if (count < 30) {
            return 'blue';
        }
        return 'red';
    }

}




