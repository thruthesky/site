import { Component, Input, OnInit } from '@angular/core';
import { AppService, KEY_SCHEDULES, SHARE_SESSION_LIST } from '../../providers/app.service';
import { ModalData, ModalService } from '../../providers/modal/modal.service';

@Component({
  selector: 'session-list-component',
  templateUrl: 'session-list.component.html',
  styleUrls: ['session-list.component.scss'],
})
export class SessionListComponent implements OnInit {
    @Input() page = '';
    @Input() share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST>{};

    re = null;
    books = [];
    my_teachers = [];
    teacher_summary = {
        total_points_from_payable_session: 0,
        total_teacher_share_points: 0,
        counts_of_payable_session: 0,
        counts_of_not_payable_session: 0,
        counts_of_paid_session: 0,
        counts_of_refunded_session: 0,
        counts_of_rejected_refund: 0,
        counts_of_requested_refund: 0,
        counts_of_incomplete_eval: 0
    };
    show_teacher = 0;
    date_begin: Date = null;
    date_end: Date = null;
    today = new Date();
    show_refund_in_progress = false;
    show_refunded = false;

    displayTeacherName = true;
    displayDate = true;
    displayPoint = true;

    loadingRefundRequest = false;
    loadingOnSearch = true;

    constructor(public a: AppService,
                public modal: ModalService
    ) {

        if ( this.a.isLogout ) {
            this.a.open('login');
            this.a.toast( this.a.t('YOU ARE NOT LOGGED IN'));
            return;
        }
        this.updatePoint();
    }

    get future(): boolean {
        return this.page === 'session-future';
    }

    get past(): boolean {
        return this.page === 'session-past';
    }

    ngOnInit() {
        const now = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth() + 1) + '-' + this.a.add0(this.today.getDate());
        if (this.future) {
            this.date_begin = new Date( now );
        } else if (this.past) {
            const _begin = new Date(this.today.getTime() - 24 * 60 * 60 * 1000 * this.a.DEFAULT_DAYS_TO_SHOW_ON_PAST_PAGE);
            const _begin_date = _begin.getFullYear() + '-' + this.a.add0(_begin.getMonth() + 1) + '-' + this.a.add0(_begin.getDate());
            this.date_begin = new Date( _begin_date );
            this.date_end = new Date( now );
        }
        this.sessionSearch();
    }

    request(options = {}) {

        let order = 'date DESC, class_begin DESC';

        if ( this.future ) {
            order = 'date ASC, class_begin ASC';
        }

        const defaults = {
            orderby: order,
            future: this.future,
            past: this.past
        };

        // console.log(defaults);

        defaults['show_refund_in_progress'] = this.show_refund_in_progress;
        defaults['show_refunded'] = this.show_refunded;
        if (this.show_teacher > 0) {
            defaults['idx_teacher'] = this.show_teacher;
        }
        if (this.date_begin) {
            console.log('typeof date_begin: ', typeof this.date_begin);
            const d = this.date_begin;
            defaults['date_begin'] = d.getFullYear() + this.a.add0(d.getMonth() + 1) + this.a.add0(d.getDate());
            // defaults['date_begin'] = this.date_begin.replace(/\-/g, '');
        }
        if (this.date_end) {
            const d = this.date_end;
            defaults['date_end'] = d.getFullYear() + this.a.add0(d.getMonth() + 1) + this.a.add0(d.getDate());
            // defaults['date_end'] = this.date_end.replace(/\-/g, '');
        }
        console.log('defaults: ', defaults);
        const req = Object.assign(defaults, options);
        // console.log("Request: ", req);
        return req;
    }

    // onClickCancelAll() {
    //     this.books.map(book => this.onClickCancel(book));
    // }

    onClickCancel(book) {

        const data: ModalData = {
            title: this.a.t('SESSION CANCEL'),
            content: this.a.t('SESSION CANCEL CONFIRM'),
            yes: this.a.t('YES'),
            no: this.a.t('CANCEL')
        };
        this.modal.confirm(data).subscribe(result => {
            if ( result ) {
                book['process'] = true;
                this.a.lms.session_cancel(book.idx).subscribe(re => {
                    // console.log(re);
                    this.books = this.books.filter( b => b.idx !== re['idx_reservation']);
                    this.a.updateLmsInfoUserNoOfTotalSessions(re['no_of_total_sessions']);
                    this.a.updateLmsInfoUserNoOfReservation(re['no_of_reservation']);
                    this.updatePoint();
                    this.a.set( KEY_SCHEDULES, null); /// new code. When a session is clicked. delete old schedule cache.
                    this.a.onLmsCancel();
                    this.a.toast( this.a.t('SESSION CANCELED'));
                }, e => {
                    book['process'] = false;
                    this.a.toast(e);
                });
            }
        });

    }

    updatePoint() {
        this.a.loadMyPoint(p => this.share.point = p);
    }

    onChangeSearchOption() {
        this.sessionSearch();
    }

    get teachers_keys() {
        return Object.keys(this.my_teachers);
    }

    sessionSearch() {
        if ( this.a.isAdmin ) {
            this.loadingOnSearch = false;
            return this.a.toast('Admin cannot view session list');
        }
        this.loadingOnSearch = true;
        this.a.lms.session_search(this.request()).subscribe(re => {
            // console.log('Result of class_search(): ', re);
            this.re = re;
            this.re['total_session_refunded'] = this.a.toInt(this.re['total_session_refunded']);
            this.re['total_session_refund_in_progress'] = this.a.toInt(this.re['total_session_refund_in_progress']);
            this.books = re['books'];
            this.my_teachers = re['my_teachers'];
            this.teacher_summary = re['teacher_summary'];
            this.loadingOnSearch = false;
        }, e => {
            // console.log('sessionSearch::', e);
            this.a.toast(e);
            this.loadingOnSearch = false;
        });

    }


    onClickCancelRefundRequest(book) {
        // console.log(book);
        this.a.lms.session_cancel_refund_request(book['idx']).subscribe(re => {
            book['refund_request_at'] = 0;
            this.a.toast(this.a.t('CANCEL REFUND REQUEST SUCCESS'));
        }, e => this.a.toast(e));
    }

    refund_in_progress(book) {
        if (book['paid'] > 0) {
            return false;
        }
        if (book['refund_done_at'] > 0) {
            return false;
        }
        if (book['refund_request_at'] > 0) {
            return true;
        }
        if (book['refund_reject_at'] > 0) {
            return true;
        }
        return false;
    }


    paid(book) {
        return book['paid'] > 0;
    }

    refundable(book) {
        if (book.refund_timeover) {
            return false;
        }
        if (this.paid(book)) {
            return false;
        }
        if (this.refunded(book)) {
            return false;
        }
        if (this.refund_in_progress(book)) {
            return false;
        }
        // console.log('settled?: ', book);
        if ( this.settled(book) ) {
            return false;
        }
        return true;
    }
    refunded(book) {
        return book['refund_done_at'] > 0;
    }
    settled(book) {
        return book['refund_settle_at'] > 0;
    }
    rejected(book) {
        return book['refund_reject_at'] > 0;
    }
    onClickRefund(book) {

        const data: ModalData = {
            title: this.a.t('SESSION REFUND'),
            content: this.a.t('SESSION REFUND CONFIRM'),
            yes: this.a.t('YES'),
            no: this.a.t('CANCEL')
        };
        this.modal.confirm(data).subscribe(result => {
            if ( result ) {
                this.a.lms.session_refund(book['idx']).subscribe(() => {
                    book['refund_done_at'] = 1;
                }, e => this.a.toast(e));
            }
        });

    }


    date(d: string) {
        const new_date = d.split('-');
        new_date.shift();
        return new_date.join('/');
    }
    evaluated(book) {
        // console.log('book: ', book);
        if (!book.comment) {
            return false;
        }
        if (!book.comment.length) {
            return false;
        }
        if (book.comment.length < 30) {
            return false;
        }
        return true;
    }
    point(book) {
        if (this.refunded(book)) {
            return '';
        } else {
            return this.a.number_format(book['point']);
        }
    }


    /**
     * Returns teacher photo url.
     * @param book book
     */
    photoURL(book) {
        return this.my_teachers[book.idx_teacher].photoURL ? this.my_teachers[book.idx_teacher].photoURL : this.a.anonymousPhotoURL;
    }

    onClickReady( book ) {
        if ( book.stamp_checked > 0 ) {
            return;
        }

        book['ready'] = true;
        // console.log(book);
        const data = {
            idx: book.idx,
            idx_teacher: book.idx_teacher
        };
        // console.log(data);
        this.a.lms.session_stamp_checked(data).subscribe(re => {
            // console.log(re);
            book['stamp_checked'] = 1;
            book['ready'] = false;
        }, e => {
            book['ready'] = false;
            this.a.toast(e);
        });


    }

    onClickKakaoQRMarkString(url) {
        if ( !this.a.isMobileView() ) {
            return;
        }
        window.open(url, '_blank');
    }

}
