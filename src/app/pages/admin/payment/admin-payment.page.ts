
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../providers/app.service';


@Component({
    selector: 'admin-payment-page',
    templateUrl: 'admin-payment.page.html',
    styleUrls: ['admin-payment.page.scss'],
})
export class AdminPaymentPage implements OnInit {

    constructor(
        public router: Router,
        public a: AppService
    ) {

        a.lms.admin_query({
            sql: `SELECT p.idx, p.currency, p.amount, p.idx_student, p.payment_method, p.point, p.state
					FROM lms_payment as p, wp_users
					WHERE BRANCH AND wp_users.ID=p.idx_student
					ORDER BY idx DESC LIMIT 100`,
            student_info: true
        }).subscribe( re => {
            console.log(re);
        }, e => this.a.toast(e));
    }

    ngOnInit() {
    }


}


