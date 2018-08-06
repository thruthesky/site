import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { MESSAGES_GROUP } from '../../../../modules/xapi/interfaces';
import { ModalService } from '../../../../providers/modal/modal.service';

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
        public modal: ModalService
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

    showModalMessage() {
        const content = `
            <section class="content">
                <p>1. Open the Kakaotalk app on your smart
                    phone. *(Login if you didn't login yet) </p>
                <p>2. In your Kakaotalk app, press the <b>More
                    Option Button</b>. (3 dot shown on the image below)</p>
                <div class="image"><img src="assets/img/kakao/6.jpg"></div>
                <p>3. Press My <b>Profile</b>. (Primary Photo
                    with your name shown on the image below)</p>
                <div class="image"><img src="assets/img/kakao/7.jpg"></div>
                <p>4. Press the <b>QR Code Button</b>.</p>
                <div class="image"><img src="assets/img/kakao/8.jpg"></div>
                <p>5. Press the <b>Download Button</b> to get a
                    copy of your QR Code. (Check your gallery or Download folder)</p>
                <div class="image"><img src="assets/img/kakao/9.jpg"></div>
                <p>6. Hurray! You have a copy of your QR Code,
                    you can update your Curriculum Vitae by uploading this image.</p>
            </section>
        `;
        this.modal.alert({ content: content });
    }

}



