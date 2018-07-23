
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MYPAGE } from '../../modules/xapi/lms.service';
import { TEACHER_LIST_INFO } from '../../modules/xapi/interfaces';


@Component({
    selector: 'my-page-page',
    templateUrl: 'my-page.page.html',
    styleUrls: ['my-page.page.scss'],
})
export class MyPagePage implements OnInit {

    loader = {
        mypage: false,
        greeting: false
    };
    mypage: MYPAGE = <any>{};
    teachers: Array<TEACHER_LIST_INFO> = [];
    constructor(
        public a: AppService
    ) {
        // console.log(`NotFoundPage::constructor()`);

        this.loader.mypage = true;
        a.lms.mypage().subscribe(re => {
            this.loader.mypage = false;
            this.mypage = re;
        }, e => a.toast(e));

        this.loadTeachers();
    }

    ngOnInit() {

    }

    loadTeachers() {
        const opt = {
            search: 'recommended',
            page_no: 1,
            limit: 100
        };
        this.a.lms.teacher_list(opt).subscribe(re => {
            this.teachers = re.teachers;
        }, () => { });
    }

    onSubmitGreeting(event: Event) {
        event.preventDefault();

        this.loader.greeting = true;
        this.a.lms.greeting_update(this.mypage.greeting).subscribe(re => {
            console.log('re: ', re);
            this.loader.greeting = false;
        }, e => this.a.toast(e));

        return false;
    }
}

