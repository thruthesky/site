import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { Branch } from '../../../../modules/xapi/lms.service';
import { ModalService } from '../../../../providers/modal/modal.service';

@Component({
    selector: 'admin-setting-page',
    templateUrl: 'admin-setting.page.html',
    styleUrls: ['admin-setting.page.scss']
})

export class AdminSettingPage implements OnInit {
    show = {
        domain_change_application: false
    };
    loader = {
        branchUpdate: false
    };
    branch: Branch = <any>{};


    domain_change_application = '';

    constructor(
        public a: AppService,
        public modal: ModalService
    ) {
        this.getBranchInformation();
    }

    ngOnInit() { }
    getBranchInformation() {
        this.a.lms.branch_get().subscribe(re => {
            console.log('re: ', re);
            this.branch = re;
        }, e => this.a.toast(e));
    }
    onSubmitDomainChangeApplication() {
        this.a.lms.branch_domain_change_application(this.domain_change_application).subscribe(re => {
            console.log('onSubmitDomainChangeApplication: re: ', re);
            this.modal.alert({ content: 'Your domain change application has been submitted.' });
            this.getBranchInformation();
            this.show.domain_change_application = false;
        }, e => this.a.toast(e));
    }
    onClickCancelDomainChangeApplication() {
        this.a.lms.branch_cancel_domain_change_application().subscribe(re => {
            console.log('cancel: re: ', re);
            this.modal.alert({ content: 'Your domain change application has been cancelled.' });
            this.getBranchInformation();
        }, e => this.a.toast(e));
    }
    onSubmitBranchInformation() {
        console.log(`onSubmitBranchInformation() `, this.branch);
        this.loader.branchUpdate = true;
        this.a.lms.branch_update(this.branch).subscribe(re => {
            this.loader.branchUpdate = false;
            console.log('branch_update: re: ', re);
            this.modal.alert({ content: 'Your branch information has been updated.' });
            this.branch = re;
        }, e => {
            this.loader.branchUpdate = false;
            this.a.toast(e);
        });
    }
}



