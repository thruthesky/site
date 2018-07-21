import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-branch-teachers-page',
    templateUrl: 'admin-branch-teachers.page.html',
    styleUrls: ['admin-branch-teachers.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminBranchTeachersPage {

    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {

    }

}




