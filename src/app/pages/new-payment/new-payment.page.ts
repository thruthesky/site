import { Component, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PAYMENT_RATE } from '../../modules/xapi/lms.service';


@Component({
    selector: 'new-payment-page',
    templateUrl: 'new-payment.page.html',
    styleUrls: ['new-payment.page.scss']
})
export class NewPaymentPage implements AfterViewInit {



    /**
     * default amount to be selected.
     */
    amount = 100000; // should 0.

    paymentMethod: '' | 'paypal' | 'bank' | 'koreanBank' | 'chineseBank' | 'japaneseBank' = 'chineseBank'; // should be empty



    paypalReady = false;

    php_error = null;


    inputAmount = false;

    paymentRate: PAYMENT_RATE = null;
    loader = {
        paymentRate: true
    };
    constructor(
        public a: AppService
    ) {

        /**
         * Get payment information. Exchange rate, etc.
         *
         * @note it needs to get real time data from server since exchange rate changes every minutes.
         */
        a.lms.payment_rate().subscribe(re => {
            this.loader.paymentRate = false;
            this.paymentRate = re;
            console.log('paymentRate: ', this.paymentRate);
        }, () => { });
    }




    ngAfterViewInit() {
        /**
         * If it's old Ie, then it gives some time to init.
         */
        let timeout = 200;
        if (this.a.isIe()) {
            timeout = 2500;
        }
        setTimeout(() => this.initPaypal(), timeout);
    }


    /**
     * Check if there is any error on Exchange Rate.
     *
     * It will detect if there is any exchange rate error.
     * For instance, if 1 Dollar is less than 1,000 Won, then it assumes as it's an error.
     *
     * @returns true if there is error.
     *          false if there is no error.
     */
    get errorOnExchangeRate() {

        if (!this.paymentRate) {
            return true;
        }


        /**
         * For Korean rate,
         *      KWR should be bigger than 900 and smaller than 1300. Or else it is an error.
         */
        const usdKwr = this.a.floatval(this.paymentRate.USD_TO_KRW);
        if (usdKwr < 900 || usdKwr > 1300) {
            return true;
        }

        /**
         * For Japanese Yen rate,
         *     JYP should be bigger than 90 and smaller than 130.
         */
        const usdJyp = this.a.floatval(this.paymentRate.USD_TO_JPY);
        if (usdJyp < 90 || usdJyp > 130) {
            return true;
        }
        /**
         * For Chinese Renminbi rate,
         *      CNY should be bigger 5 and smaller than 9.
         */
        const usdCny = this.a.floatval(this.paymentRate.USD_TO_CNY);
        if (usdCny < 5 || usdCny > 9) {
            return true;
        }

        //
        return false;


    }


    initPaypal() {
        const paypal = window['paypal'];
        if (!paypal) {
            this.a.toast('PAYPAL INIT FAIL');
        }

        const CREATE_PAYMENT_URL = this.a.urlBackend + '/wp-content/plugins/xapi-2/lms/paypal-create-payment.php';
        const EXECUTE_PAYMENT_URL = this.a.urlBackend + '/wp-content/plugins/xapi-2/lms/paypal-execute-payment.php';
        // console.log('create payment url: ', CREATE_PAYMENT_URL);
        // console.log('execute payment url: ', EXECUTE_PAYMENT_URL);
        paypal.Button.render({
            env: 'production', // sandbox | production
            commit: true, // Show a 'Pay Now' button
            // style: {
            //     color: 'gold',
            //     size: 'small'
            // },

            style: {
                label: 'buynow',
                fundingicons: true, // optional
                branding: true, // optional
                size: 'responsive', // small | medium | large | responsive
                shape: 'rect',   // pill | rect
                color: 'gold'   // gold | blue | silve | black
            },

            payment: () => {
                this.a.onBeginPayment();
                // console.log('amont: ', this.amount);
                // console.log('debug url: ', CREATE_PAYMENT_URL + '?amount=' + this.amount + '&session_id=' + this.a.user.sessionId );
                return paypal.request.post(CREATE_PAYMENT_URL, { amount: this.amount, session_id: this.a.user.sessionId })
                    .then((res) => {
                        // console.log('Response from php: ', res);
                        if (res['code']) { // error.
                            // alert(res['message']); // alert() is not working
                            // console.log('ERROR from create-payment.php', res);
                            this.php_error = res['message'];
                            return 0;
                        } else {
                            return res.paymentID;
                        }
                    });
            },
            onAuthorize: (data, actions) => {
                const execute_data = {
                    paymentID: data.paymentID,
                    payerID: data.payerID
                };
                return paypal.request.post(EXECUTE_PAYMENT_URL, execute_data)
                    .then(res => {
                        // console.log('result from paypal execute: ', res);
                        let re;
                        let message;
                        // console.log(res['code']);
                        if (res['code']) {
                            re = false;
                            message = res['message'];
                        } else {
                            re = true;
                            message = '';
                        }
                        const params = { result: re, message: message };
                        // console.log(params);
                        this.a.open('payment-result', params);
                    });
            },
            onCancel: (data, actions) => {
                // alert('결제를 취소하였습니다. You have cancelled the payment.');
                this.a.open('payment-result', { result: false, message: '결제를 취소하였습니다. You have cancelled the payment.' });
            },
            onError: (err) => {
                // console.log('onError: err: ', err['message']);
                if (err['message'] && err['message'].indexOf('#paypal-button does not exist') !== -1) {
                    // 중요:
                    // 사용자가 결제 페이지를 클릭하면,
                    // 페이팔에서 #paypal_button 을 찾는데,
                    // 사용자가 결제 페이지를 클릭하고, 초기화 되기 전에 다른 페이지로 바꿔 버리면,
                    // #paypal_button 을 못찾아서 초기화 에러를 내는데
                    // 그 에러를 표시하지 않는다.
                } else if (err['message'] && err['message'].indexOf('Cannot set property') !== -1) {
                    // When a user click pay button and close the popup immediately.
                } else {
                    if (this.a.user.isLogout) {
                        alert('앗, 로그인을 해 주세요. Please login');
                    } else if (this.php_error) {
                        alert(this.php_error);
                    } else {
                        alert('앗, 결제 중에 에러가 발생하였습니다. An error occurred during the transaction');
                    }
                }
            }
        }, '#paypal-button')
            .then(() => {
                this.paypalReady = true;
                this.a.render();
                // console.log('Paypal icon rendered.')
            })
            .catch(e => {
                // 중요:
                // 사용자가 결제 페이지를 클릭하면,
                // 페이팔에서 #paypal_button 을 찾는데,
                // 사용자가 결제 페이지를 클릭하고, 초기화 되기 전에 다른 페이지로 바꿔 버리면,
                // #paypal_button 을 못찾아서 초기화 에러를 내는데
                // 그 에러를 표시하지 않는다.
            });
    }


    get usdWithVat() {
        if (!this.amount) {
            return 0;
        }
        const vatRate = this.a.floatval(this.paymentRate.VAT);
        const vat = this.amount * vatRate / 100;
        const usdWithVat = (this.amount + vat) / 1000;
        return usdWithVat;
    }
    /**
     * No buyer rate in USD.
     */
    amount_in_usd_with_tax() {
        if (!this.paymentRate) {
            return;
        }
        return Math.round(this.usdWithVat * 100) / 100;
    }

    amount_in_krw_with_tax() {
        if (!this.paymentRate) {
            return;
        }
        const kwr = this.usdWithVat * this.a.floatval(this.paymentRate.USD_TO_KRW);
        return Math.round(kwr);
    }

    amount_in_cny_with_tax() {
        if (!this.paymentRate) {
            return;
        }
        const cny = this.usdWithVat * this.a.floatval(this.paymentRate.USD_TO_CNY);
        return Math.round(cny * 100) / 100;
    }

    amount_in_jpy_with_tax() {
        if (!this.paymentRate) {
            return;
        }
        const jpy = this.usdWithVat * this.a.floatval(this.paymentRate.USD_TO_JPY);
        return Math.round(jpy * 100) / 100;
    }

    amount_in_usd() {
        if (!this.amount) {
            return 0;
        }
        const amount = this.amount / 1000;
        return Math.round( amount * 100 ) / 100;
    }


    onSelectBankTransaction() {
        this.paymentMethod = 'bank';
    }
    onSelectPaypalPayment() {
        this.paymentMethod = 'paypal';
    }


    getCurrency(): string {
        if (this.paymentMethod === 'koreanBank') {
            return 'KRW';
        } else if (this.paymentMethod === 'chineseBank') {
            return 'CNY';
        } else if (this.paymentMethod === 'japaneseBank') {
            return 'JPY';
        } else {
            return '';
        }
    }
    getAmount(): number {
        switch (this.getCurrency()) {
            case 'KRW': return this.amount_in_krw_with_tax();
            case 'CNY': return this.amount_in_cny_with_tax();
            case 'JPY': return this.amount_in_jpy_with_tax();
            default: return 0;
        }
    }
    onSelectBankCountry(bankCountry) {
        this.paymentMethod = bankCountry;
        const req = {
            point: this.amount,
            amount: this.getAmount(),
            currency: this.getCurrency()
        };
        this.a.lms.payment_bank_country_selection(req).subscribe(re => {
            console.log('payment_bank_country_selection: ', re);
        }, e => {
            console.log('error on payment_bank_country_selection(): ', e);
        });
    }
    onConfirmManualAmountInput(value) {
        this.inputAmount = false;
        console.log('amount value: ', value);
        this.amount = parseInt(value, 10);
    }
}



