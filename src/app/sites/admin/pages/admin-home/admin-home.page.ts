import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { Branch } from '../../../../modules/xapi/lms.service';
import { ModalService } from '../../../../providers/modal/modal.service';

@Component({
    selector: 'admin-home-page',
    templateUrl: 'admin-home.page.html',
    styleUrls: ['admin-home.page.scss']
})

export class AdminHomePage implements OnInit {
    latestBranches: Array<Branch> = [];
    domain_change_applications: Array<Branch> = [];
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
    }

    ngOnInit() { }

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
    onClickDomainChangeApplicationReject(branch: Branch) {
        this.a.lms.branch_cancel_domain_change_application(branch.idx).subscribe(re => {
            console.log('cancel: re: ', re);
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



