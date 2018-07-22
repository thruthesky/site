
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'my-page-page',
    templateUrl: 'my-page.page.html',
    styleUrls: ['my-page.page.scss'],
})
export class MyPagePage implements OnInit {

    constructor(
        public a: AppService
    ) {
        // console.log(`NotFoundPage::constructor()`);

    }

    ngOnInit() {

    }

}

