import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ForumService, WP_POST } from '../../../../providers/forum/forum.service.module';

@Component({
    selector: 'katalkenglish-home-page',
    templateUrl: 'katalkenglish-home.page.html',
    styleUrls: ['katalkenglish-home.page.scss'],
})
export class KatalkEnglishHomePage {

    // stats;
    showMoreMyOwnPlan_1 = false;
    showMoreMyOwnPlan_2 = false;
    showMoreMyOwnPlan_3 = false;
    moreAboutKatalkEnglish = false;

    moreAbout1 = false;
    moreAbout2 = false;
    moreAbout3 = false;
    moreAbout4 = false;

    teachers = [];
    total_teachers = 0;


    show = {};

    // reminders
    reminders: Array<WP_POST> = [];

    //
    showVideoTutorialReserve = false;
    constructor(
        public a: AppService,
        public forum: ForumService
    ) {
        a.warningIeEdge();
        this.loadTeachers();

        forum.loadPosts({ slug: 'student_reminders', page: 1, per_page: 5 }).subscribe( res => {
            console.log('res: ', res);
            this.reminders = res;
        });
    }

    showMoreMyOwnPlan() {
        setTimeout(() => this.showMoreMyOwnPlan_1 = true, 100);
        setTimeout(() => this.showMoreMyOwnPlan_2 = true, 300);
        setTimeout(() => this.showMoreMyOwnPlan_3 = true, 500);
    }


    showMoreAboutKatalkEnglish() {

        this.moreAboutKatalkEnglish = true;

        setTimeout(() => this.moreAbout1 = true, 100);
        setTimeout(() => this.moreAbout2 = true, 1000);
        setTimeout(() => this.moreAbout3 = true, 2000);
        setTimeout(() => this.moreAbout4 = true, 3000);

    }

    loadTeachers() {
        const opt = {
            recommend: true,
            page_no: 1,
            limit: 8
        };
        this.a.lms.teacher_list(opt).subscribe(re => {
            this.teachers = re['teachers'];
            this.total_teachers = re['total'];
        }, () => {});
    }
}

