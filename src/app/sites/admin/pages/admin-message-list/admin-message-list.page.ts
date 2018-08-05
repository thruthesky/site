import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { MESSAGES_GROUP } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'admin-message-list-page',
    templateUrl: 'admin-message-list.page.html',
    styleUrls: ['admin-message-list.page.scss']
})
export class AdminMessageListPage implements OnInit {

    messages: MESSAGES_GROUP = null;
    stat_date_begin = 0;
    stat_date_end = 0;

    loader = {
      message: false
    };

    constructor(
        public a: AppService,
    ) {

        this.onClickSelectDate();

    }

    ngOnInit() { }


    onClickSelectDate( begin = null, end = null ) {
        const d = new Date();

        if ( begin != null ) {
            const begin_date = new Date( d.getTime() - ( begin * 24 * 60 * 60 * 1000) );
            this.stat_date_begin = parseInt(begin_date.getFullYear() + this.a.add0((begin_date.getMonth() + 1)) + this.a.add0(begin_date.getDate()), 10);
        } else {
            this.stat_date_begin = parseInt(d.getFullYear() + this.a.add0((d.getMonth() + 1)) + this.a.add0(1), 10);
        }

        if ( end != null ) {
            const end_date = new Date( d.getTime() + ( end * 24 * 60 * 60 * 1000) );
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        } else {
            const end_date = new Date( d.getTime() + ( 24 * 60 * 60 * 1000) );
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        }

        this.loadMessageList();
    }

    loadMessageList() {
        this.loader.message = true;
        this.a.lms.admin_message_list({ date_begin: this.stat_date_begin, date_end: this.stat_date_end }).subscribe(res => {
            console.log('messages: ', res);
            this.messages = res;
            this.loader.message = false;
        }, e => {
            this.a.toast(e);
            this.loader.message = false;
        });
    }

}



