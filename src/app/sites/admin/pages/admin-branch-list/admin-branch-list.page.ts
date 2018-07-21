import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'admin-branch-list-page',
    templateUrl: 'admin-branch-list.page.html',
    styleUrls: ['admin-branch-list.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminBranchListPage implements OnInit {

    re: Array<Branch> = null;
    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
        this.loadBranches();
    }
    loadBranches() {
        this.a.xapi.post({ route: 'lms.branch_list' }).subscribe(re => {
            console.log('re: ', re);
            this.re = re;
        }, e => this.a.toast(e));
    }
    ngOnInit() { }
    onClickDelete(branch: Branch) {
        const re = confirm('WARNING: Are you sure you want to delete a branch?');
        if (!re) {
            return;
        }
        this.a.xapi.post({ route: 'lms.branch_delete', session_id: this.a.user.sessionId, idx: branch.idx }).subscribe(res => {
            console.log('branch_delete: ', res);
            this.loadBranches();
        }, e => this.a.toast(e));
    }
}


