import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { SESSION } from '../../../../modules/xapi/lms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-point-refund-page',
    templateUrl: 'admin-point-refund.page.html',
    styleUrls: ['admin-point-refund.page.scss']
})

export class AdminPointRefundPage implements OnInit {

    form = {
        idx: '',
        date: '',
        teacher: '',
        student: '',
        orderby: 'desc',
        limit: 50,
        grade: 0
    };
    re: Array<SESSION> = [];

    constructor(
        public a: AppService,
        public router: Router,
        public activated: ActivatedRoute
    ) {
        activated.paramMap.subscribe( params => {
            if ( params.get('field') === 'idx' ) {
                this.form.idx = params.get('value');
            }
            this.loadSessions();
        });
    }

    ngOnInit() { }

    loadSessions() {
        this.a.lms.get_sessions_in_refund_progress( this.form ).subscribe(re => {
            console.log(re);
            this.re = re;
            this.pre();
        }, e => this.a.toast(e));
    }
    onSubmit(event: Event) {
        event.preventDefault();

        this.loadSessions();

        return false;
    }

    pre() {
        if (!this.re || !this.re.length) {
            return;
        }
        for (const session of this.re) {
            session.teacherName = this.a.shortName(session.teacherName);
            session.studentName = this.a.shortName(session.studentName);

            const d = session.date.toString();
            session.date = d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8);
            session.class_begin = session.class_begin.slice(0, 2) + ':' + session.class_begin.slice(2);
            session.refund_request_at = this.a.dateTime(session.refund_request_at);
            session.refund_reject_at = this.a.dateTime(session.refund_reject_at);
        }

    }


    onAccept( idx ) {
        const re = confirm('Accept? The point will go back to STUDENT.');
        if ( ! re ) {
            return;
        }
        const msg = prompt('Admin settle accept.', 'Admin settle the refund request by accepting student request.');
        if ( ! msg ) {
            return;
        }
        this.a.lms.admin_accept_refund_request({idx: idx, message: msg })
            .subscribe( _idx => {
                // console.log('idx: ', _idx);
                const i = this.re.findIndex( session => session.idx === _idx );
                this.re.splice(i, 1);
            }, e => this.a.toast(e) );
    }
    onReject( idx ) {
        const re = confirm('Reject? The point will go to TEACHER.');
        if ( ! re ) {
            return;
        }
        const msg = prompt('Admin settle reject.', 'Admin settle the refund request by rejecting student request.');
        if ( ! msg ) {
            return;
        }
        this.a.lms.admin_reject_refund_request({idx: idx, message: msg})
            .subscribe( _idx => {
                // console.log('idx: ', _idx);
                const i = this.re.findIndex( session => session.idx === _idx );
                this.re.splice(i, 1);
            }, e => this.a.toast(e) );
    }

}



