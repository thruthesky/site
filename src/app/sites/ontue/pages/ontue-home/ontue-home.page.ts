import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { TEACHER_SITE_INFO } from '../../../../modules/xapi/interfaces';
import { ForumService } from '../../../../providers/forum/forum.service';



@Component({
    selector: 'app-page-ontue-home',
    templateUrl: 'ontue-home.page.html',
    styleUrls: ['ontue-home.page.scss'],
})
export class OntueHomePage {

    reminders;

    site_info: TEACHER_SITE_INFO = {
        comment_from_student: <any>{},
        comment_from_teacher: [],
        no_of_past: '0',
        no_of_reservations: '0',
        no_of_student: '0',
        no_of_teacher: '0',
        recent_graded_teachers: [],
        recent_reservations: [],
        topearner: <any> {}
    };


    greetings;
    auctions;
    constructor(
        public a: AppService,
        public forum: ForumService
    ) {
        this.a.lms.get_teacher_site_info().subscribe(res => {
            // console.log('res', res);
            this.site_info = res['site_info'];
        }, () => {
        });

        forum.loadPosts({slug: 'teacher_reminders', page: 1, per_page: 3}).subscribe(re => this.reminders = re);

        a.lms.get_greetings().subscribe( res => {
            console.log('get_greetings: ', res);
            this.greetings = res;
        }, e => this.a.toast(e));
        a.lms.get_auctions().subscribe( res => {
            console.log('get_auctions: ', res);
            this.auctions = res;
        }, e => this.a.toast(e));
    }
}



