
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'qna-page',
    templateUrl: 'qna.page.html',
    styleUrls: ['qna.page.scss'],
})
export class QnAPage implements OnInit {


    constructor(
        public a: AppService
    ) {
        // console.log(`NotFoundPage::constructor()`);

    }

    ngOnInit() {

    }

}
