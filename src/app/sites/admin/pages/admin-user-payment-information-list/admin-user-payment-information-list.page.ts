import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-user-payment-information-list-page',
    templateUrl: 'admin-user-payment-information-list.page.html',
    styleUrls: ['admin-user-payment-information-list.page.scss']
})
export class AdminUserPaymentInformationListPage implements OnInit {

    ID: number = null;
    idx_teacher: number = null;
    teachers = null;
    payment_information = null;
    selectedID = null;
    stat_date_begin = 0;
    stat_date_end = 0;
    loader = {
        record: false,
        history: false
    };

    paymentInfoView = false;

    constructor(public a: AppService,
                public active: ActivatedRoute,) {


        active.paramMap.subscribe(params => {
            const ID = params.get('ID');
            if (ID) {
                // this.loadDefault({idx_teacher: ID});
            } else {
                // this.loadDefault();
            }

        });

        this.onClickSelectDate();
    }

    ngOnInit() {
    }


    onClickSelectDate(begin = null, end = null) {
        const d = new Date();

        if (begin != null) {
            const begin_date = new Date(d.getTime() - ( begin * 24 * 60 * 60 * 1000));
            this.stat_date_begin = parseInt(begin_date.getFullYear() + this.a.add0((begin_date.getMonth() + 1)) + this.a.add0(begin_date.getDate()), 10);
        } else {
            this.stat_date_begin = parseInt(d.getFullYear() + this.a.add0((d.getMonth() + 1)) + this.a.add0(1), 10);
        }

        if (end != null) {
            const end_date = new Date(d.getTime() + ( end * 24 * 60 * 60 * 1000));
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        } else {
            const end_date = new Date(d.getTime() + ( 24 * 60 * 60 * 1000));
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        }

        this.loadPaymentList();
    }


    loadPaymentList() {
        this.loader.record = true;
        this.a.lms.admin_user_payment_information_list({
            date_begin: this.stat_date_begin,
            date_end: this.stat_date_end
        }).subscribe(res => {
            console.log('messages: ', res);
            this.teachers = res['teachers'];
            this.payment_information = res['payment_information'];
            this.loader.record = false;
        }, e => {
            this.a.toast(e);
            this.loader.record = false;
        });
    }

    showPaymentInfo(ID) {
        this.paymentInfoView = true;
        this.selectedID = ID;
        this.a.scrollToTop();
    }


    onClickShowHistory() {
        this.loader.history = true;
        this.a.lms.payment_information_history_by_id(this.selectedID).subscribe(res => {
            // console.log("payment history", res);
            this.payment_information[this.selectedID]['history'] = res['payment_history'];
            this.loader.history = false;
        }, e => {
            this.a.toast(e);
            this.loader.history = false;
        });
    }

}



