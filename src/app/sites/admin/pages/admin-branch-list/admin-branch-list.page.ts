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
    branch = null;
    loader = {
        branch: false
    };

    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService,
    ) {
        this.loadBranches();
    }
    loadBranches() {
        this.loader.branch = true;
        this.a.lms.get_branches().subscribe(re => {
            // console.log('re: ', re);
            this.re = re;
            this.loader.branch = false;
            // setTimeout( () => {
                this.a.scrollIntoViewById('branch-list');
            // }, 1000);
        }, e => {
            this.a.toast(e);
            this.loader.branch = false;
        });
    }
    ngOnInit() { }
    onClickDelete(branch: Branch) {
        const re = confirm('WARNING: Are you sure you want to delete a branch?');
        if (!re) {
            return;
        }
        this.a.xapi.post({ route: 'lms.branch_delete', session_id: this.a.user.sessionId, idx: branch.idx }).subscribe(res => {
            // console.log('branch_delete: ', res);
            this.loadBranches();
        }, e => this.a.toast(e));
    }

    onClickEdit( branch: Branch ) {
        this.loader.branch = true;
        this.a.lms.get_branch_info_by_domain(branch.domain).subscribe( re => {
            // console.log('onClickEdit:: ', branch);
            this.branch = re;
            this.loader.branch = false;
        }, e => {
            this.a.toast(e);
            this.loader.branch = false;
        });
    }

    onSubmitUpdate(event) {
        if (event) {
            this.branch = null;
            this.loadBranches();
        }
    }
}


