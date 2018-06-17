import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-setting-page',
    templateUrl: 'admin-setting.page.html',
    styleUrls: ['admin-setting.page.scss']
})

export class AdminSettingPage implements OnInit {
    constructor(
        public a: AppService
    ) {
    }

    ngOnInit() { }
}



