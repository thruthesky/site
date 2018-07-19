import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-no-of-user-per-each-domain-page',
    templateUrl: 'admin-no-of-user-per-each-domain.page.html',
    styleUrls: ['admin-no-of-user-per-each-domain.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminNoOfUserPerEachDomainPage implements OnInit {

    re = null;
    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
        a.xapi.post({route: 'lms.admin_no_of_users_per_each_domain'}).subscribe( res => {
            // console.log('res: ', res);
            this.re = res;
        }, e => a.alert(e));
    }
    ngOnInit() { }
}


