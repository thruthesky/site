
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../providers/app.service';


@Component({
    selector: 'admin-user-page',
    templateUrl: 'user.page.html',
    styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit {

    re = null;
    form = {
        name: '',
        male: '',
        female: '',
        student: '',
        teacher: '',
        point_begin: 0,
        point_end: 9999999,
        limit: 99,
        date_begin: '0000-00-00',
        date_end: '',
        domain: '',
        manager: '',
        grade_begin: 0,
        grade_end: 99,
        list_order_begin: 0,
        list_order_end: 999,
        bookable_time_begin: 0,
        bookable_time_end: 99999,
        timezone: '',
        order: 'ID',
        by: 'DESC',
        display: {
            ID: false,
            phone_number: false,
            grade: false,
            bookable_time: false,
            list_order: false,
            timezone: false,
            domain: false,
            manager: false,
            stat: {
                count_result: true,
                count_daily_registration: true,
                count_monthly_registration: false,
                count_domain: false,
                count_timezone: false
            }
        }
    };
    constructor(
        public router: Router,
        public a: AppService
    ) {
        // a.showHeader = false;

        // a.lms.admin_query({
        //     sql: `SELECT p.idx, p.currency, p.amount, p.idx_student, p.payment_method, p.point, p.state
        // 			FROM lms_payment as p, wp_users
        // 			WHERE BRANCH AND wp_users.ID=p.idx_student
        // 			ORDER BY idx DESC LIMIT 100`,
        //     student_info: true
        // }).subscribe( re => {
        //     console.log(re);
        // }, e => this.a.toast(e));
        const d = (new Date);
        this.form.date_end = d.getFullYear() + '-' + a.add0((d.getMonth() + 1)) + '-' + a.add0(d.getDate());

        this.onSubmit();
    }

    ngOnInit() {
    }

    onSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        console.log(this.form);
        this.a.lms.admin_query({
            sql: `SELECT ID, user_email, display_name
					FROM wp_users
					WHERE BRANCH LIMIT ${this.form.limit}`,
        }).subscribe(re => {
            this.re = re;
            console.log(re);
        }, e => this.a.toast(e));
        return false;
    }


    onChangeSelectOrder(event) {
        const value = event.target.value;
        console.log('onChangeSelectorOrder: ', value);
        this.form.order = value;
    }

}
