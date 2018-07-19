import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-menu-page',
    templateUrl: 'admin-menu.page.html',
    styleUrls: ['admin-menu.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminMenuPage implements OnInit {

    constructor(
        public activated: ActivatedRoute,
        public router: Router,
        public a: AppService
    ) {
    }
    ngOnInit() { }
}


