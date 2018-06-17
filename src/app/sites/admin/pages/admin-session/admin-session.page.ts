import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-session-page',
    templateUrl: 'admin-session.page.html',
    styleUrls: ['admin-session.page.scss']
})

export class AdminSessionPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}



