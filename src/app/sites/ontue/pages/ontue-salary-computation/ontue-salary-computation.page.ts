import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

export interface PAYMENT_COMPUTATION_INFORMATION {
    NEW_EXCHANGE_SELLER_RATE: number;
    WU: { any };
    gcash_transaction: number;
    point_to_usd: number;
    teacher_share: number;
    transaction_fee_paypal: number;
    transaction_fee_teacher_share: number;
    transaction_fee_branch_share: number;
    transaction_fee_office_share: number;
    usd_to_php: number;
    usd_to_php_with_seller_rate: number;
}
@Component({
    selector: 'ontue-salary-computation-page',
    templateUrl: 'ontue-salary-computation.page.html',
    styleUrls: ['ontue-salary-computation.page.scss']
})

export class OntueSalaryComputationPage {

    loading = false;
    payment_information = {
        payment_method: 'paypal'
    };
    payment_computation: PAYMENT_COMPUTATION_INFORMATION = <PAYMENT_COMPUTATION_INFORMATION>{
        teacher_share: 0,
    };


    total_points = null;
    teacher_share = 0;
    paypal_transaction_fee = 0;
    teacher_share_after_transaction_fee = 0;
    salary_in_usd = 0;
    salary_in_php = 0;

    constructor(public a: AppService,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {

            if (params.total_points) {
                this.total_points = params.total_points;
            }
        });

        this.a.lms.get_payment_computation_info().subscribe(re => {
            // console.log('get_payment_computation_info', re);
            this.payment_computation = re;
            this.recompute();
        }, e => {
            this.a.toast(e);
        });

    }

    recompute() {
        this.teacher_share = Math.round( (this.total_points * this.payment_computation.teacher_share / 100 ) * 100) / 100;
        this.paypal_transaction_fee = Math.round(( this.teacher_share * this.payment_computation.transaction_fee_teacher_share / 100) * 100 ) / 100;
        this.teacher_share_after_transaction_fee = Math.round( (this.teacher_share - this.paypal_transaction_fee) * 100 ) / 100;
        this.salary_in_usd = Math.round(this.teacher_share_after_transaction_fee / this.payment_computation['point_to_usd'] * 100 ) / 100;
        this.salary_in_php = Math.round(this.salary_in_usd * this.payment_computation['usd_to_php_with_seller_rate'] * 100) / 100;
    }
}

