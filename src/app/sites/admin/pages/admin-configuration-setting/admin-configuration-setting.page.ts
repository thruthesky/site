import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

export interface ADMIN_CONFIG {
    CANCELLABLE_TIME_FOR_INSTANT_RESERVATION: number;
    GCASH_TRANSACTION: number;
    LOW_POINT_PER_MINUTE: number;
    MAX_CANCELLABLE_TIME: number;
    MAX_FREE_CLASS: number;
    MAX_FREE_CLASS_LIMIT: number;
    MAX_FREE_CLASS_MINUTES: number;
    MAX_FREE_CLASS_WITH_SAME_TEACHER: number;
    MAX_GRADE: number;
    MAX_LOW_POINT_RESERVATION: number;
    MAX_POINT_PER_MINUTE: number;
    MAX_POINT_PER_TEACHER_GRADE: Array<number>;
    MAX_REFUNDABLE_TIME: number;
    MAX_RESERVABLE_DAYS_PER_GRADE: Array<number>;
    NEW_EXCHANGE_BUYER_RATE: number;
    NEW_EXCHANGE_SELLER_RATE: number;
    PAYMENT_COMPUTATION_DAYS_AFTER_CUTOFF: number;
    PAYMENT_COMPUTATION_DAYS_UPTO: number;
    PAYMENT_DELAY_IF_PHP_LESS_THAN: number;
    PAYMENT_DELAY_IF_USD_LESS_THAN: number;
    PAYPAL_TEACHER_FEE: number;
    PAYPAL_TRANSACTION_FEE: number;
    PAYPAL_TRANSACTION_FEE_FOR_BRANCH: number;
    PAYPAL_TRANSACTION_FEE_FOR_OFFICE: number;
    PAYPAL_TRANSACTION_FEE_FOR_TEACHER: number;
    POINT_TO_USD: number;
    PROMO_CLASS_SCHEDULES: { [key: number]: number };
    VAT: number;
    WU_FEE: { [key: number]: number };
    currency_info: {};
    exception_share: { [key: string]: number };
    share: {[key: string]: number};
    usd_to_krw_with_seller_rate: number;
    usd_to_php_with_seller_rate: number;
}


@Component({
    selector: 'admin-configuration-setting-page',
    templateUrl: 'admin-configuration-setting.page.html',
    styleUrls: ['admin-configuration-setting.page.scss']
})

export class AdminConfigurationSettingPage implements OnInit {

    loader = {
        config: true
    };

    configuration: ADMIN_CONFIG = null;

    constructor(
        public a: AppService
    ) {

        this.loadConfiguration();
    }

    ngOnInit() { }

    loadConfiguration() {
        this.a.lms.admin_configuration_setting().subscribe( re => {
            // console.log('admin_configuration_setting', re);
            this.configuration = re;
            this.loader.config = false;
        });
    }

}



