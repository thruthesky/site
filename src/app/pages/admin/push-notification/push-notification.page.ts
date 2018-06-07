import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../providers/app.service';

interface Stat {
    domains: { [domain: string]: number };
    platforms: { [platform: string]: number };
}

@Component({
    selector: 'push-notification-page',
    templateUrl: 'push-notification.page.html'
})
export class PushNotificationPage implements OnInit {
    form = {
        type: '',
        domain: '',
        url: '',
        title: '',
        body: ''
    };
    stat: Stat = <any>{};
    constructor(
        public a: AppService
    ) {
        a.lms.admin_push_token_stat().subscribe(stat => {
            this.stat = stat;
        });
    }

    ngOnInit() { }

    keys( obj ) {
        return Object.keys(obj);
    }
    onSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.a.lms.admin_push_send(this.form).subscribe(res => {
            // console.log('onSubmit()', res);
        }, e => this.a.toast(e));

        return false;
    }
}

