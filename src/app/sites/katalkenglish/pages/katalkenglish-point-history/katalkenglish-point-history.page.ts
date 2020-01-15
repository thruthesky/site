import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { POINT_HISTORY } from '../../../../modules/xapi/interfaces';


@Component({
    selector: 'katalkenglish-point-history-page',
    templateUrl: 'katalkenglish-point-history.page.html',
    styleUrls: ['katalkenglish-point-history.page.scss']
})
export class KatalkEnglishPointHistoryPage implements OnInit {

    pointHistory: Array<POINT_HISTORY> = [];

    today = new Date();
    date_begin: Date = null;
    date_end: Date = null;
    limit = 100;

    showLoader = true;
    constructor(
        public a: AppService
    ) {
        if ( this.a.isLogout ) {
            this.a.open('login');
            this.a.toast( this.a.t('YOU ARE NOT LOGGED IN'));
            return;
        }

    }

    ngOnInit() {
      const now = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth() + 1) + '-' + this.a.add0(this.today.getDate());
      this.date_begin = new Date(now);
      this.pointHistorySearch();
    }


    onChangeSearchOption() {
      this.pointHistorySearch();
    }

    pointHistorySearch() {
      this.showLoader = true;
      const data = {
        limit: this.limit
      };

      if (this.date_begin) {
        const d = this.date_begin;
        data['date_begin'] = d.getFullYear() + this.a.add0(d.getMonth() + 1) + this.a.add0(d.getDate());
      }
      if (this.date_end) {
        const d = this.date_end;
        data['date_end'] = d.getFullYear() + this.a.add0(d.getMonth() + 1) + this.a.add0(d.getDate());
      }
      this.a.lms.get_point_history(data).subscribe( res => {
        console.log('pointHistory', res);
        this.showLoader = false;
        this.pointHistory = res['point_history'];
      }, e => {
        this.a.toast(e);
        this.showLoader = false;
      });
    }
}




