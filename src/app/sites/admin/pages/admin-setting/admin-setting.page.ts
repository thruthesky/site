import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { Branch } from '../../../../modules/xapi/lms.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { FILES } from '../../../../modules/xapi/interfaces';
import { XapiFileUploadComponent } from '../../../../components/xapi-file-upload/xapi-file-upload.component';

interface Form {
    classPushNotification: '';
}


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
        branchUpdate: false,
        get: false,
        save: false
    };
    branch: Branch = <any>{};

    form: Form = <any>{};

    domain_change_application = '';

    @ViewChild('companyLogo') companyLogo: XapiFileUploadComponent;
    files: FILES = [];
    constructor(
        public a: AppService,
        public modal: ModalService
    ) {
        this.getBranchInformation();
    }

    ngOnInit() { }
    getBranchInformation() {
        this.a.lms.branch_get().subscribe(re => {
            // console.log('re: ', re);
            this.branch = re;
        }, e => this.a.toast(e));
    }
    onSubmitDomainChangeApplication() {
        this.a.lms.branch_domain_change_application(this.domain_change_application).subscribe(re => {
            // console.log('onSubmitDomainChangeApplication: re: ', re);
            this.modal.alert({ content: this.a.ln.DOMAIN_CHANGE_APPLICATION, ok: this.a.ln.OK });
            this.getBranchInformation();
            this.show.domain_change_application = false;
        }, e => this.a.toast(e));
    }
    onClickCancelDomainChangeApplication() {
        this.a.lms.branch_cancel_domain_change_application().subscribe(re => {
            // console.log('cancel: re: ', re);
            this.modal.alert({ content: this.a.ln.DOMAIN_CHANGE_APPLICATION_CANCELLED, ok: this.a.ln.OK });
            this.getBranchInformation();
        }, e => this.a.toast(e));
    }
    onSubmitBranchInformation() {
        // console.log(`onSubmitBranchInformation() `, this.branch);
        this.loader.branchUpdate = true;
        this.a.lms.branch_update(this.branch).subscribe(re => {
            this.loader.branchUpdate = false;
            // console.log('branch_update: re: ', re);
            this.modal.alert({ content: this.a.ln.BRANCH_INFO_UPDATED, ok: this.a.ln.OK });
            this.branch = re;
        }, e => {
            this.loader.branchUpdate = false;
            this.a.toast(e);
        });
    }


    onSuccessUploadPicture(file) {
        /**
         * Delete previous photo.
         *
         * file[0]
         */
        if (this.files.length > 1) { /// If there are two files, one for prvious photo, the other is for new photo.
            this.companyLogo.deleteFile(this.files[0], () => this.updateCompanyLogo(file), () => this.updateCompanyLogo(file));
        } else {
            this.updateCompanyLogo(file);
        }

    }


    updateCompanyLogo(file) {
        // console.log('file uploaded: ', file);
        this.branch.logo_url = file.url;
        this.a.lms.branch_update({ logo_url: this.branch.logo_url }).subscribe( re => {
            // console.log('branch_update logo: re:', re);
        }, e => this.a.toast(e));
    }


    onSubmitPushNotificatioTime(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.loader.save = true;
        this.a.lms.admin_save_settings(this.form).subscribe(res => {
            this.loader.save = false;
            // console.log('admin_settings(): ', res);
        }, e => {
            this.loader.save = false;
            this.a.toast(e);
        });
        return false;
    }

}



