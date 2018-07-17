import { Component, AfterViewInit } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../../../providers/app.service';


@Component({
    selector: 'katalkenglish-session-future-page',
    templateUrl: 'katalkenglish-session-future.page.html',
    styleUrls: ['katalkenglish-session-future.page.scss'],
})
export class KatalkEnglishSessionFuturePage implements AfterViewInit {

    page = 'session-future';
    share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> {options: false};

    isStudent = false;
    constructor(public a: AppService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isStudent = this.a.isStudent;
        }, 200);
    }
}


