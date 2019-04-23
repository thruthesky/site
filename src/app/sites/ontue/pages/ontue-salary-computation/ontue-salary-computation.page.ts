import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

export interface PAYMENT_COMPUTATION_INFORMATION {
    NEW_EXCHANGE_SELLER_RATE: number;
    WU: { [key: string]: string };
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

    transaction_rate = 0;
    constructor(public a: AppService,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {

            if (params.total_points) {
                this.total_points = params.total_points;
            } else {
                this.total_points = 0;
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
        console.log(this.payment_information);
        if (!this.total_points) {
            return;
        }
        let str = '' + this.total_points;
        str = str.replace(/,/g, '');
        const point = parseInt(str, 10);
        this.teacher_share = Math.round( ( point * this.payment_computation.teacher_share / 100 ) * 100) / 100;
        this.paypal_transaction_fee = Math.round(( this.teacher_share * this.payment_computation.transaction_fee_teacher_share / 100) * 100 ) / 100;
        this.teacher_share_after_transaction_fee = Math.round( (this.teacher_share - this.paypal_transaction_fee) * 100 ) / 100;
        this.salary_in_usd = Math.round(this.teacher_share_after_transaction_fee / this.payment_computation['point_to_usd'] * 100 ) / 100;
        const in_php = Math.round(this.salary_in_usd * this.payment_computation['usd_to_php_with_seller_rate'] * 100) / 100;
        if (this.payment_information.payment_method === 'western-union') {
            const wu = this.payment_computation.WU;
            Object.keys(wu).some(v => {
                if ( in_php <= parseInt(v, 10)) {
                    this.transaction_rate = parseInt(wu[v], 10);
                    return true;
                }
                return false;
            });
        } else if (this.payment_information.payment_method === 'gcash') {
            this.transaction_rate = Math.ceil(in_php / 1000) * this.payment_computation.gcash_transaction;
        }
        this.salary_in_php = in_php - this.transaction_rate;
    }
}

