
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'not-found-page',
    templateUrl: 'not-found.page.html',
    styleUrls: ['not-found.page.scss'],
})
export class NotFoundPage implements OnInit {


    constructor(
        public a: AppService
    ) {
        console.log(`NotFoundPage::constructor()`);

    }

    ngOnInit() {

    }

}
