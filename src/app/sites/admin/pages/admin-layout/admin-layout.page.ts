import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-layout-page',
    templateUrl: 'admin-layout.page.html',
    styleUrls: ['admin-layout.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminLayoutPage implements OnInit {


    /**
     * quick search
     */
    uid = '';
    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
        console.log('AdminLayoutPage::construction()');

        activated.queryParamMap.subscribe(params => {
            if (params.get('session_id')) {
                const session_id = params.get('session_id');
                console.log('session_id: ', session_id);
                console.log('user email: ', this.a.user.email);
                this.a.user.loadProfile( session_id ).subscribe( re => {
                    console.log('user logged in as email: ', this.a.user.email);
                }, e => this.a.toast(e));
            } else {
                if (a.isLogout) {
                    this.a.toast('Please login first');
                    this.a.open('/manager/login');
                }
            }
        });
    }

    ngOnInit() { }
    onSubmitUserQuickSearch(event: Event) {
        event.preventDefault();
        this.router.navigateByUrl('/manager/user/uid/' + this.uid);
        return false;
    }
}




