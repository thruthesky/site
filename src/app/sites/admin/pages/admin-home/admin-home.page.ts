import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { ADMIN_SUMMARY_REPORT, BOOK, Branch } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'admin-home-page',
    templateUrl: 'admin-home.page.html',
    styleUrls: ['admin-home.page.scss']
})

export class AdminHomePage implements OnInit {
    latestBranches: Array<Branch> = [];
    domain_change_applications: Array<Branch> = [];
    reports: ADMIN_SUMMARY_REPORT = <ADMIN_SUMMARY_REPORT>{};
    refundRequests: Array<BOOK> = [];
    loader = {
        domainChangeApplication: true
    };
    constructor(
        public a: AppService,
        public modal: ModalService
    ) {
        if ( a.isSuperManager ) {
            this.loadDomainChangeApplications();
        }

        this.loadLatestBranches();
        this.loadAdminReports();
        this.loadRefundRequest();
    }

    ngOnInit() { }

    loadAdminReports() {
        this.a.lms.admin_branch_record_get().subscribe( re => {
            // console.log('loadAdminReports', re);
            this.reports = re;
        }, e => {
            this.a.toast(e);
        });
    }

    loadDomainChangeApplications() {
        this.loader.domainChangeApplication = true;
        this.a.lms.branch_get_domain_change_applications().subscribe(re => {
            this.loader.domainChangeApplication = false;
            // console.log('branch_get_domain_change_applications: re: ', re);
            this.domain_change_applications = re;
        }, e => {
            this.loader.domainChangeApplication = false;
            this.a.toast(e);
        });
    }

    loadRefundRequest() {
        let sql = `SELECT r.* FROM lms_reservation as r, wp_users WHERE BRANCH AND wp_users.ID = r.idx_student`;

        sql += ` AND ( (r.refund_request_at > 0) OR (r.refund_reject_at > 0) )
                    AND refund_done_at = 0
                    AND refund_settle_at = 0
                    AND paid=0 `;
        sql += ` ORDER BY r.date DESC, r.class_begin DESC`;
        sql += ` LIMIT 5`;
        // console.log('sql: ', sql);
        this.a.lms.admin_query({
            sql: sql,
            student_info: true,
            teacher_info: true
        }).subscribe(re => {
            // console.log('refund request: ', re);
            this.refundRequests = re;
            if (this.refundRequests && this.refundRequests.length) {
                for (const s of this.refundRequests) {
                    this.a.convertSessionIntoUserTime(s);
                    s.date = s.date.substr(4);
                }
            }
        }, e => this.a.toast(e));
    }
    onClickDomainChangeApplicationReject(branch: Branch) {
        this.a.lms.branch_cancel_domain_change_application(branch.idx).subscribe(re => {
            // console.log('cancel: re: ', re);
            this.modal.alert({ content: 'Domain change application has been cancelled.' });
            this.loadDomainChangeApplications();
        }, e => this.a.toast(e));
    }
    async onClickDomainChangeApplicationAccept(branch: Branch) {
        if ( branch.domain_change_application.indexOf('katalkenglish.com') === -1 ) {
            const re = await this.modal.confirm({ content: `<b style='color: red;'>Warning: This is not a subdomain of katalkenglsih. Have you done nginx server work?</b>`})
            .toPromise();
            if ( ! re ) {
                return;
            }
        }
        this.a.lms.branch_accept_domain_change_application(branch.idx).subscribe(re => {
            // console.log('branch_accept_domain_change_application: re: ', re);
            this.modal.alert({ content: 'Domain change application has been done.' });
            this.loadDomainChangeApplications();
        }, e => this.a.toast(e));
    }
    loadLatestBranches() {
        if ( ! this.a.isSuperManager ) {
            return;
        }
        this.a.lms.admin_query({
            sql: 'SELECT idx, domain, user_ID as idx_student, company_name FROM lms_branch ORDER BY idx DESC LIMIT 5',
            student_info: true
        }).subscribe( (re: Array<Branch>) => {
            // console.log('list branches: ', re);
            this.latestBranches = re;
        }, e => this.a.toast(e));
    }
}



