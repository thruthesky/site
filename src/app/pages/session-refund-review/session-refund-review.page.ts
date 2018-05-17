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
    showConfirmReject = false;

    constructor(public router: Router,
                public active: ActivatedRoute,
                public a: AppService,
                public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.active.queryParams.subscribe(params => {
            this.idx = params.idx;
            if (params.idx) {
                this.a.lms.get_session_refund_info({idx: params.idx}).subscribe(re => {
                    console.log('get_session_refund_info::', re);
                    this.book = re;
                }, e => {
                    this.a.toast(e);
                });
            } else {
                this.a.toast(this.a.t('IDX SESSION MISSING'));
                if ( this.a.isStudent ) {
                    this.a.open('session-past');
                } else if ( this.a.isTeacher) {
                    this.a.open('teacher-session-past');
                } else {
                    this.a.open('/');
                }
            }
        });
    }

    async onClickRefund() {
        const confirm = await this.alertCtrl.create({
            header: this.a.t('REFUND ACCEPT'),
            subHeader: this.a.t('REFUND ACCEPT CONFIRM'),
            buttons: [
                {
                    text: this.a.t('YES'),
                    handler: () => {
                        this.a.lms.session_refund(this.book['idx']).subscribe(re => {
                            // console.log(re);
                            this.a.open('teacher-session-past');
                            this.a.toast( this.a.t('REFUND ACCEPT SUCCESS'));
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

    async onClickRejectRefundRequest() {
        if ( this.loadingRefundReject ) {
            return;
        }

        if ( this.message ) {
            const confirm = await this.alertCtrl.create({
                header: this.a.t('REFUND REJECT'),
                subHeader: this.a.t('REFUND REJECT CONFIRM'),
                buttons: [
                    {
                        text: this.a.t('YES'),
                        handler: () => {
                            console.log('this.message', this.message);
                            this.loadingRefundReject = true;
                            this.a.lms.session_refund_reject({
                                idx_reservation: this.book.idx,
                                refund_reject_message: this.message
                            }).subscribe(res => {
                                this.loadingRefundReject = false;
                                this.a.open('teacher-session-past');
                                this.a.toast( this.a.t('REFUND REJECT SUCCESS'));
                            }, e => {
                                this.a.toast(e);
                                this.loadingRefundReject = false;
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
        } else {
            this.a.toast( this.a.t('MESSAGE EMPTY'));
        }
    }

}
