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
    payment_information = null;

    loader = {
      record: false
    };

    constructor(
        public a: AppService,
        public active: ActivatedRoute,
    ) {


        active.paramMap.subscribe(params => {
            const ID = params.get('ID');
            if ( ID ) {
                this.loadDefault({idx_teacher: ID});
            } else {
                this.loadDefault();
            }

        });
    }

    ngOnInit() { }


    loadDefault(o = {}) {
        if ( this.ID ) {
            o['idx_teacher'] = this.ID;
        }

        this.loader.record = true;
        this.a.lms.admin_user_payment_information_list(o).subscribe(res => {
            console.log('messages: ', res);
            this.payment_information = res;
            this.loader.record = false;
        }, e => {
            this.a.toast(e);
            this.loader.record = false;
        });
    }


}



