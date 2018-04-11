
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
    limit = 60; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
    noMoreTeachers: boolean;

    constructor(
        public router: Router,
        public a: AppService
    ) {
        this.a.lms.teacher_list({
          }).subscribe(re => {
            console.log(re);
            this.re = re;
            this.teachers = this.teachers.concat( this.re.teachers );
            if ( this.re.teachers.length < this.limit ) {
              this.noMoreTeachers = true;
            }
          }, e => this.a.toast(e));
    }

    ngOnInit() {
    }

}

