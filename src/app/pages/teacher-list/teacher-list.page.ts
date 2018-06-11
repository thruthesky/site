import { Component, OnInit } from '@angular/core';
import { AppService, KEY_TEACHER_LIST } from '../../providers/app.service';
import { Router } from '@angular/router';


interface OPTIONS {
    useCache?: boolean;
}


@Component({
    selector: 'teacher-list-page',
    templateUrl: 'teacher-list.page.html',
    styleUrls: ['teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit {

    re = null;
    teachers = [];

    gender = '';
    recommend = 'Y';
    page_no: number;
    limit = 120; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
    noMoreTeachers: boolean;

    show = {
        loadTeacher: false
    };

    display_options = false;
    mode = null;
    title = 'Teacher List';

    constructor(
        public router: Router,
        public a: AppService
    ) {
        this.init();
        this.loadTeachers({ useCache: true });
    }

    ngOnInit() {
    }

    init() {
        this.re = null;
        this.teachers = [];
        this.page_no = 1;
        this.noMoreTeachers = false;
    }

    displayTeachers(re) {
        if (re) {
            this.re = re;
            if (this.re.teachers) {
                this.teachers = this.teachers.concat(this.re.teachers);
            }
        }
    }
    loadTeachers(options: OPTIONS = {}) {
        if (options.useCache) {
            const data = this.a.get(KEY_TEACHER_LIST);
            // console.log(`Use cached teacher list`, data);
            this.displayTeachers(data);
        }
        this.show.loadTeacher = true;
        this.a.lms.teacher_list({
            gender: this.gender,
            recommend: this.recommend,
            page_no: this.page_no,
            limit: this.limit
        }).subscribe(re => {
            /**
             * If cached data has been loaded.
             */
            if (options.useCache) {
                this.init();
                // console.log('Save cache teacher list', re);
                this.a.set( KEY_TEACHER_LIST, re );
            }
            this.show.loadTeacher = false;
            this.displayTeachers(re);
            if (this.re.teachers.length < this.limit) {
                this.noMoreTeachers = true;
            }
        }, e => {
            this.a.toast(e);
            this.show.loadTeacher = false;
        });
    }

    onChangeOption() {
        this.init();
        this.loadTeachers();
    }

    onClickShowMoreTeacher() {
        this.page_no++;
        this.loadTeachers();
    }

    onClickShowAllTeachers() {
        this.display_options = true;
        this.a.scrollToTop(50);
    }

}

