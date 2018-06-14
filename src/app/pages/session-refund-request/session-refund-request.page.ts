import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'session-refund-request-page',
    templateUrl: 'session-refund-request.page.html',
    styleUrls: ['session-refund-request.page.scss'],
})
export class SessionRefundRequestPage implements OnInit, AfterViewInit {

    message = null;
    loadingRefundRequest = false;
    idx;
    constructor(
        public router: Router,
        public active: ActivatedRoute,
        public a: AppService
    ) { }

    ngOnInit() {
        this.active.queryParams.subscribe(params => {
            this.idx = params.idx;
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            try {
                const textarea: HTMLElement = document.getElementById('refund-request-textarea');
                textarea.focus();
            } catch {
                console.error('Soft-error: Failed to put cursor on textarea.');
            }
        }, 300);
    }


    onClickSubmit() {
        if (this.loadingRefundRequest) {
            return;
        }
        if (this.message) {
            this.loadingRefundRequest = true;
            this.a.lms.session_refund_request({
                idx_reservation: this.idx,
                refund_request_message: this.message
            }).subscribe(() => {
                this.loadingRefundRequest = false;
                this.a.open('session-past');
                this.a.toast(this.a.t('REFUND REQUEST SUCCESS'));
            }, e => {
                this.a.toast(e);
                this.loadingRefundRequest = false;
            });
        } else {
            this.a.toast(this.a.t('MESSAGE EMPTY'));
        }
    }
}
