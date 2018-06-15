import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService, KEY_TEACHER_LIST } from '../../providers/app.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { TEACHER_LIST_RESPONSE, TEACHER_LIST_INFO } from '../../modules/xapi/interfaces';

interface OPTIONS {
    useCache?: boolean;
}


@Component({
    selector: 'teacher-list-page',
    templateUrl: 'teacher-list.page.html',
    styleUrls: ['teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit, OnDestroy {

    re: TEACHER_LIST_RESPONSE = null;

    /**
     * This holds all teachers that are searched.
     *
     * this.re.teachers will only holds the teachers of the request.
     * This is needed to display teachers on the list.
     */
    teachers: Array<TEACHER_LIST_INFO> = [];
    countries: Array<string> = null;

    gender = '';
    search = 'recommended';
    page_no: number;
    limit = 180; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
    noMoreTeachers: boolean;

    show = {
        loadTeacher: false
    };

    display_options = false;
    mode = null;
    title = 'Teacher List';
    teacher_name = '';
    country = '';
    teacherNameChange: Subject<string> = new Subject<string>();

    constructor(
        public router: Router,
        public a: AppService
    ) {
        this.init();
        this.loadTeachers({ useCache: true });
        this.teacherNameChange
            .debounceTime(500) // wait 500ms after the last event before emitting last event
            .distinctUntilChanged() // only emit if value is different from previous value
            // .map(v => console.log('v: ', v))
            .subscribe((v) => {
                console.log('v: ', v);
                if ( v !== '' && v.length < 2 ) {
                    return;
                }
                this.init();
                this.loadTeachers();
            });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.teacherNameChange.unsubscribe();
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

        const query = {
            gender: this.gender,
            name: this.teacher_name,
            country: this.country,
            search: this.search,
            page_no: this.page_no,
            limit: this.limit
        };

        // console.log('loadTeachers', query);
        this.a.lms.teacher_list(query).subscribe(re => {
            console.log('re: ', re);
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

    nameChange() {
        // console.log('nameChange');
        this.teacherNameChange.next(this.teacher_name);
    }

    onClickSearchOptions() {
        this.display_options = true;
        this.search = '';
        if (!this.countries) {
            this.teacher_country_get();
        }
        this.init();
        this.loadTeachers();
    }

    teacher_country_get() {
        this.a.lms.teacher_country_get().subscribe( res => {
            this.countries = res;
        }, e => this.a.toast(e));
    }

}

