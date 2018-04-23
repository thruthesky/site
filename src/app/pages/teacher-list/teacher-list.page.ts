import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Router } from '@angular/router';


@Component({
    selector: 'teacher-list-page',
    templateUrl: 'teacher-list.page.html',
    styleUrls: ['teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit {

    re;
    teachers = [];

    gender = '';
    recommend = 'Y';
    page_no: number;
    limit = 60; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
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
        this.loadTeachers();
    }

    ngOnInit() {
    }

    init() {
        this.teachers = [];
        this.page_no = 1;
        this.noMoreTeachers = false;
    }

    loadTeachers() {
        this.show.loadTeacher = true;
        this.a.lms.teacher_list({
            gender: this.gender,
            recommend: this.recommend,
            page_no: this.page_no,
            limit: this.limit
        }).subscribe(re => {
            this.show.loadTeacher = false;
            // console.log(re);
            this.re = re;
            this.teachers = this.teachers.concat( this.re.teachers );
            if ( this.re.teachers.length < this.limit ) {
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
        this.page_no ++;
        this.loadTeachers();
    }

    onClickShowAllTeachers() {
        this.display_options = true;
        document.querySelector('.page-header').scrollIntoView({behavior: 'smooth', block: 'start'});
    }

}

