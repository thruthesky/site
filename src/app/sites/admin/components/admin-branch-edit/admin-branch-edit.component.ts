import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { Branch, FILES } from '../../../../modules/xapi/interfaces';
import { XapiFileUploadComponent } from '../../../../components/xapi-file-upload/xapi-file-upload.component';

interface Form {
    classPushNotification: '';
}


@Component({
    selector: 'admin-branch-edit-component',
    templateUrl: 'admin-branch-edit.component.html',
    styleUrls: ['admin-branch-edit.component.scss']
})

export class AdminBranchEditComponent implements OnInit {

    @Input() branch: Branch = <any>{};

    loader = {
        branchUpdate: false,
        get: false,
        save: false
    };
    form: Form = <any>{};


    @ViewChild('companyLogo') companyLogo: XapiFileUploadComponent;
    files: FILES = [];
    constructor(
        public a: AppService,
        public modal: ModalService
    ) {
    }

    ngOnInit() { }

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
        this.a.lms.branch_update({ idx: this.branch.idx, logo_url: this.branch.logo_url }).subscribe( re => {
            // console.log('branch_update logo: re:', re);
        }, e => this.a.toast(e));
    }

}



