import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'admin-promo-message-page',
    templateUrl: 'admin-promo-message.page.html',
    styleUrls: ['admin-promo-message.page.scss']
})

export class AdminPromoMessagePage implements OnInit {
    form = {
        teacher: '',
        student: '',
        title: 'Hi #studentName. Let\'s study English?',
        template: `Hello #studentName. I am teacher #teacherName.
I am a #stars star teacher. I have been teaching English for 5 years now.
I can teach English from beginner to advanced students.
I can teach Phonics, Conversational English, Business English Toeic, IELTS and almost every topics.
If you have time, please view my profile and see me how good I am.
You can add and talk to me with kakaotalk. My kakaotalk ID: #kakaotalkID
Thank you.`
    };
    teachers: Array<{ ID: string, display_name: string }> = [];
    constructor(public a: AppService) {
        let sql = `SELECT ID, display_name FROM wp_users WHERE BRANCH AND wp_users.user_group = 'withcenter'`;
        sql += ` AND wp_users.grade > 0 `;
        this.a.lms.admin_query({ sql: sql }).subscribe(res => {
            console.log('aq: ', res);
            this.teachers = res;

            this.test();
        }, e => this.a.toast(e));
    }

    test() {
        this.form.teacher = '150';
        this.form.student = 'test';
        this.sendMessages();
    }
    ngOnInit() { }

    onClickSendButton() {
        this.sendMessages();
    }

    sendMessages() {

        this.a.lms.admin_promo_message(this.form).subscribe(res => {
            console.log('res: ', res);
        }, e => this.a.toast(e));
    }
}

