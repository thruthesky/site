import { Component } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../../../providers/app.service';


@Component({
    selector: 'katalkenglish-session-past-page',
    templateUrl: 'katalkenglish-session-past.page.html',
    styleUrls: ['katalkenglish-session-past.page.scss'],
})
export class KatalkEnglishSessionPastPage {

    page = 'session-past';
    share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> {options: false};
    showLevel = false;
    myLevel: any = '로딩중...';

    constructor(public a: AppService) {
            this.a.lms.get_my_level().subscribe(re => {
                console.log('my level', re);
                this.myLevel = re['level'];
                if (this.myLevel) {
                    this.showLevel = true;
                }
            }, e => this.a.toast(e));
    }
}


