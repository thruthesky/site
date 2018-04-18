import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../../../../providers/app.service';

@Component({
    selector: 'ontue-payment-information-page',
    templateUrl: 'ontue-payment-information.page.html',
    styleUrls: ['ontue-payment-information.page.scss']
})
export class OntuePaymentInformationPage {


    payment_information = {};
    payment_information_history = [];

    reload_history = false;

    constructor(
        public a: AppService,
        public router: Router
    ) {
        if (a.user.isLogin && a.isTeacher) {
            this.loadPaymentInformation();
        } else {
            this.router.navigateByUrl('/teacher');
            a.toast('User type must be teacher and should login first...');
        }
    }


    onClickSubmit() {
        this.a.lms.payment_information_update(this.payment_information).subscribe(re => {
            // console.log(re);
            this.a.toast('Success');
            if (this.reload_history) {
                this.onClickShowHistory();
            }
        }, e => this.a.toast(e));
    }


    loadPaymentInformation() {
        this.a.lms.payment_information().subscribe(re => {
            // console.log(re);
            if (re['payment_information']) {
                this.payment_information = re['payment_information'];
            }
        }, e => this.a.toast(e));
    }


    onClickShowHistory() {
        this.a.lms.payment_information_history().subscribe(res => {
            // console.log("payment history", res);
            this.payment_information_history = res['payment_history'];
            this.reload_history = true;
        }, e => {
            this.a.toast(e);
        });
    }

}

