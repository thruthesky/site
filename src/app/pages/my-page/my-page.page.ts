
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MYPAGE } from '../../modules/xapi/lms.service';


@Component({
    selector: 'my-page-page',
    templateUrl: 'my-page.page.html',
    styleUrls: ['my-page.page.scss'],
})
export class MyPagePage implements OnInit {

    loader = false;
    mypage: MYPAGE = null;
    constructor(
        public a: AppService
    ) {
        // console.log(`NotFoundPage::constructor()`);

        this.loader = true;
        a.lms.mypage().subscribe(re => {
            this.loader = false;
            this.mypage = re;
        }, e => a.toast(e));
    }

    ngOnInit() {

    }

}

