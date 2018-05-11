import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

export interface PAYMENT_COMPUTATION_INFORMATION {
    buyer_rate: number;
    gcash_transaction: number;
    teacher_share: number;
    transaction_fee: number;
    php: string;
    usd: string;
    WU: {any};
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
        WU: {}
    };


    total_points = 0;
    teacher_share = 0;
    paypal_charges = 0;
    buying_rate = 0;
    earnings = 0;
    salary = '0';
    gcash_transaction_fee = 0;

  constructor(
    public a: AppService,
    private route: ActivatedRoute,
  ) {
      this.route.queryParams.subscribe(params => {

          if (params.total_points) {
              this.total_points = params.total_points;
          }
      });

      this.a.lms.get_payment_computation_info().subscribe(re => {
          this.payment_computation = re;
          this.recompute();
      }, e => {
          this.a.toast(e);
      });

  }

    recompute() {
        this.teacher_share = this.total_points * this.payment_computation.teacher_share / 100;
        this.paypal_charges = this.teacher_share * this.payment_computation.transaction_fee / 100;
        if ( this.payment_information['payment_method'] !== 'paypal' ) {
            this.buying_rate = this.teacher_share * this.payment_computation.buyer_rate / 100;
        }
        this.earnings = Math.round(this.teacher_share - this.paypal_charges - this.buying_rate);
        if (this.payment_information['payment_method'] === 'paypal') {
            this.salary = Math.round(this.earnings / parseInt(this.payment_computation['usd'], 10)) + 'USD';
        } else {
            const converted =  Math.round(this.earnings / parseInt(this.payment_computation['php'], 10));
            this.salary = converted + 'PHP';
        }

    }


}
