import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'admin-branch-teachers-page',
    templateUrl: 'admin-branch-teachers.page.html',
    styleUrls: ['admin-branch-teachers.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminBranchTeachersPage {

    loader = {
        submit: false
    };
    branch: Branch = null;
    form = {
        teachers_group: '',
        teachers_level: '',
        teachers_idx: '',
        teachers_order: '',
        teachers_exclude: ''
    };
    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
        this.getBranchInformation();
    }


    getBranchInformation() {
        this.a.lms.branch_get().subscribe(re => {
            // console.log('re: ', re);
            this.branch = re;
            this.form.teachers_group = this.branch.teachers_group;
            this.form.teachers_level = this.branch.teachers_level;
            this.form.teachers_idx = this.branch.teachers_idx;
            this.form.teachers_order = this.branch.teachers_order;
            this.form.teachers_exclude = this.branch.teachers_exclude;
        }, e => this.a.toast(e));
    }

    onSubmit(event: Event) {
        event.preventDefault();
        // console.log(`onSubmitBranchInformation() `, this.branch);
        this.loader.submit = true;
        this.a.lms.branch_update(this.form).subscribe(re => {
            this.loader.submit = false;
            this.getBranchInformation();
        }, e => {
            this.loader.submit = false;
            this.a.toast(e);
        });
        return false;
    }

}




