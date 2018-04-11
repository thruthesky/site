
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService, USER, USER_NOT_FOUND } from './../../../../modules/firelibrary/core';
import { AppService } from '../../../../providers/app.service';
import { USER_LOGIN } from '../../../../modules/xapi/interfaces';


@Component({
    selector: 'admin-header-component',
    templateUrl: 'admin-header.component.html',
    styleUrls: ['admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {

    form = <USER_LOGIN>{};
    constructor(
        public router: Router,
        public fire: FireService,
        public a: AppService
    ) { }

    ngOnInit() {
    }


}

