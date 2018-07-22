import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
    selector: 'session-refund-reject-page',
    templateUrl: 'session-refund-reject.page.html',
    styleUrls: ['session-refund-reject.page.scss'],
})
export class SessionRefundRejectPage implements OnInit {

    idx;
    message = null;
    book;

    constructor(public router: Router,
                public active: ActivatedRoute,
                public a: AppService) {
    }

    ngOnInit() {
        this.active.queryParams.subscribe(params => {
            this.idx = params.idx;
            if (params.idx) {
                this.a.lms.get_session_refund_info({idx: params.idx}).subscribe(re => {
                    // console.log('get_session_refund_info::', re);
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
                    this.a.openHome();
                }
            }
        });
    }



    onClickClose() {
        if ( this.a.isStudent ) {
            this.a.open('session-past');
        } else if ( this.a.isTeacher) {
            this.a.open('teacher-session-past');
        } else {
            this.a.openHome();
        }
    }

}
