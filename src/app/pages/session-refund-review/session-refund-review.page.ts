import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
    selector: 'session-refund-review-page',
    templateUrl: 'session-refund-review.page.html',
    styleUrls: ['session-refund-review.page.scss'],
})
export class SessionRefundReviewPage implements OnInit {

    idx;
    message = null;
    book;
    loadingRefundReject = false;

    constructor(public router: Router,
                public active: ActivatedRoute,
                public a: AppService,
                public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.active.queryParams.subscribe(params => {
            this.idx = params.idx;
            // todo get the book information and verify if the user is authorize to edit.
        });
    }

    async onClickRefund(book) {
        const confirm = await this.alertCtrl.create({
            header: this.a.t('ACCEPT REFUND'),
            subHeader: this.a.t('CONFIRM ACCEPT REFUND'),
            buttons: [
                {
                    text: this.a.t('YES'),
                    handler: () => {
                        this.a.lms.session_refund(book['idx']).subscribe(re => {
                            // console.log(re);
                            this.a.open('teacher-session-past');
                        }, e => {
                            this.a.toast(e);
                        });
                    }
                },
                {
                    text: this.a.t('CANCEL'),
                    handler: () => {
                        // console.log('Cancel');
                    }
                }
            ]
        });
        confirm.present();
    }

    onClickRejectRefundRequest() {
        if ( this.loadingRefundReject ) {
            return;
        }

        if ( this.message ) {
            // console.log('this.message', this.message);
            // this.loadingRefundReject = true;
            // this.a.lms.session_refund_reject({
            //     idx_reservation: this.book.idx,
            //     refund_reject_message: this.message
            // }).subscribe(res => {
            //     this.loadingRefundReject = false;
            //     this.a.open('teacher-session-past');
            // }, e => {
            //     this.a.toast(e);
            //     this.loadingRefundReject = false;
            // });
        } else {
            this.a.toast( this.a.t('MESSAGE EMPTY'));
        }
    }

}
