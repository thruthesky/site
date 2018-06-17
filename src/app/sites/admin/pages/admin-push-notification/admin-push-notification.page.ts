import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-push-notification-page',
    templateUrl: 'admin-push-notification.page.html',
    styleUrls: ['admin-push-notification.page.scss']
})

export class AdminPushNotificationPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}



