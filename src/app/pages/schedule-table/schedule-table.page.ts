
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SCHEDULE_TABLE, N, TEACHER, SCHEDULE_COMPRESSED, TABLE } from '../../modules/xapi/interfaces';
import { SESSION } from '../../modules/xapi/lms.service';

const MAX_POINT = 30000;
const MAX_DURATION = 360;
@Component({
    selector: 'schedule-table-page',
    templateUrl: 'schedule-table.page.html',
    styleUrls: ['schedule-table.page.scss'],
})
export class ScheduleTablePage implements OnInit, AfterViewInit, OnDestroy {

    N = N;
    /**
     * If ` re == null `, then it is loading.
     */
    re: SCHEDULE_TABLE = null;
    params: any = {};
    limit = 60; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
    noMoreTeachers: boolean;

    form = {
        teachers: [],
        class_begin_hour: '0',
        class_end_hour: '24',
        duration: '0',
        min_duration: 0,
        max_duration: MAX_DURATION,
        point: '0',
        min_point: 0,
        max_point: MAX_POINT,
        days: 7,
        display_weekends: 'Y',
        navigate: 'today',
        starting_day: '',
        useCache: true          /// ** Only first schedule table list will be cached.
    };


    defaultPhotoUrl;
    show = {
        schedule_loader: false,
        more_icon_description: false
    };


    userTime = '';



    /**
     * Display 'reserve' help gif ani if the user has no reservation.
     */
    showHelpReserve = false;


    /**
     * Set true if the logged in user is a student.
     *
     * @description The reason why it does not use `a.isStudent` is to avoid ExpressionChangedAfterItHasBeenChecked erorr
     *      on cypress. Somehow cypress makes this error.
     *      - This is now become a major problem. This code is all over the app.
     *          May need to handle this error.
     */
    isStudent = false;

    /**
     * Becomes true for 5 seconds if user's point has been updated.
     */
    pointHasBeenUpdated = false;
    //
    constructor(
        public router: Router,
        public active: ActivatedRoute,
        public a: AppService
    ) {

        this.showHelpReserve = !a.lmsInfoUserNoOfTotalSessions;

        if (a.isDesktopView()) {
            this.form.days = 15;
        }
        this.defaultPhotoUrl = a.urlBackend + '/wp-content/plugins/xapi-2/lms/img/default-teacher-photo.jpg';
        // a.showHeader = false;
        this.active.queryParams.subscribe(params => {
            // console.log('params:', params);
            this.params = params;
            if (params['idx_teacher']) {
                this.form.teachers = [params['idx_teacher']];
            } else {
                this.form.teachers = [];
            }
            this.loadScheduleAndDisplay(this.form);
        });
        a.updateUserPoint();
        // setTimeout( () => { a.updateUserPoint(); }, 1000);

    }

    isLoading() {
        return this.re === null;
    }
    isLoadComplete() {
        return !this.isLoading();
    }

    ngOnInit() {

    }
    ngAfterViewInit() {
        if (this.a.isLogout) {
            setTimeout(() => {
                this.a.toast(this.a.t('LOGIN_FIRST_TO_SEE_SCHEDULE_TABLE_TIME'));
            }, 500);
        }
        setTimeout(() => {
            this.isStudent = this.a.isStudent;
        }, 300);
    }
    ngOnDestroy() {
        this.re = null;
    }

    onSearchSubmit() {
        // const duration = parseInt(this.form.duration, 10);
        // delete this.form.duration;
        // if (duration) {
        //     this.form.min_duration = duration;
        //     this.form.max_duration = duration + 9;
        // } else {
        //     this.form.min_duration = 0;
        //     this.form.max_duration = MAX_DURATION;
        // }
        // const point = parseInt(this.form.point, 10);
        // // console.log('point:', point);
        // delete this.form.point;
        // if (point) {
        //     this.form.min_point = point;
        //     if ( point === 1 ) {
        //         this.form.max_point = 999;
        //     } else {
        //         this.form.max_point = point + 999;
        //     }
        // } else {
        //     this.form.min_point = 0;
        //     this.form.max_point = MAX_POINT;
        // }
        // console.log('onSearchSubmit(): ', this.form);
        this.form.useCache = false;
        this.loadScheduleAndDisplay(this.form);
        return false;
    }

    /**
     * Load and display schedule table.
     * @param options options
     *
     * @todo
     *      - translate timezone into their country language.
     *      - log `activity log` into firebase.
     */
    loadScheduleAndDisplay(options) {
        this.re = null;
        this.show.schedule_loader = true;
        this.a.loadSchedule(options, re => {
            // console.log('a.loadSChedule: re: ', re);
            this.show.schedule_loader = false;
            /**
             * If there are schedules.
             */
            if (re.table.length) {
                if (this.isSingleTeacher) {         // if single teacher.
                    this.re = re;
                    this.a.onUserViewProfile(this.teacher_name(re.table[0]));
                } else {
                    const table: TABLE = re.table;
                    re.table = [];
                    this.re = re;
                    this.re.table.push(table.shift());
                    this.displayRows(table);
                }
            } else {            // if there is no schedule.
                this.re = re;
            }
            // console.log('loadScheduleAndDisplay::', re);
        });
    }
    displayRows(table) {
        if (table && table.length) {
            setTimeout(() => {
                // console.log(this.re);
                /**
                 * When (schedule table search) option changed in the middle of displaying,
                 * `this.re` becomes null
                 * And load schedule again
                 * Meaning, it will stop and destroy previous display data and display new data.
                 */
                if (this.re && this.re.table) {
                    this.re.table.push(table.shift());
                    /**
                     * If the browser is not IE nor Edge, then draws another to fast draw.
                     * So, if the brwoser is not IE nor Edge, it display three times as faster than IE or Edge.
                     */
                    if (!this.a.isIeEdge()) {
                        if (table.length) {
                            this.re.table.push(table.shift());
                        }
                        if (table.length) {
                            this.re.table.push(table.shift());
                        }
                    }
                    this.displayRows(table);
                }
                // if (table && table.length) {
                //     this.re.table.push(table.shift());
                // }
            }, 50);
        }
    }

    /**
     * Returns true if this schedule table display is for a single teacher.
     */
    get isSingleTeacher() {
        return !!this.params['idx_teacher'];
    }
    get isAllTeacher() {
        return !this.isSingleTeacher;
    }
    get isFreeClassBlock() {
        return this.a.getYmd() <= this.re.teacher['block_free_class_until'];
    }

    onClickNavigate(navigate) {
        this.form.navigate = navigate;
        this.form.useCache = false;
        this.form.starting_day = this.re.starting_day;
        this.loadScheduleAndDisplay(this.form);
    }


    /**
     * Returns teacher information from session information.
     *
     * `session` has `idx_schedule` and `schedule` has `idx_schedule` AND `idx_teacher`.
     * it looks up teacher information with `idx_teacher`.
     *
     * @param session session of the reservation table
     */
    teacher(session = null): TEACHER {
        if (session == null) {
            return null;
        }
        if (session[this.N.idx_schedule] === void 0) {
            return null;
        }

        /**
         * Check if the idx_schedule exist sin schedule list.
         */
        if (this.re.schedule[session[this.N.idx_schedule]] === void 0) {
            // console.log('schedule NOT found with ' + session[this.N.idx_schedule]);
            return null;
        }
        const schedule = this.re.schedule[session[this.N.idx_schedule]];
        // console.log('session: ', session);
        // console.log('schedule: ', schedule);
        if (schedule[this.N.idx_teacher] === void 0) { // Schedule is found. But no value in idx_teacher ?
            return null;
        }

        // console.log("tl: ", this.teachers.length );
        // if ( this.teachers.length == 0 ) return null;
        const idx_teacher = schedule[this.N.idx_teacher];           // Got idx_teacher now !!
        // console.log('idx_schedule: ', session.idx_schedule);
        // console.log('idx_teacher: ', idx_teacher);

        /**
         * Check if teacher exists in teacher list.
         */
        if (this.re.teachers[idx_teacher] === void 0) {                // No teacher exists?
            // console.log('no teacher? of ' + idx_teacher);
            return null;
        }
        /**
         * Return teacher informaton.
         */
        return this.re.teachers[idx_teacher];
    }


    /**
     * Returns a teacher's photo URL.
     * @param sessions sessions. A row of a schedule table.
     */
    teacher_photoURL(sessions: Array<SESSION> = null): string {
        // console.log(`session: `, sessions);
        let session;
        if (sessions) {
            session = sessions[0];
        } else {
            session = null;
        }
        const teacher = this.teacher(session);
        // console.log(teacher);
        if (teacher) {
            if (teacher.photoURL !== void 0) {
                return teacher.photoURL;
            } else {
                return this.defaultPhotoUrl;
            }
        } else {
            /**
             * If schedule display is for single teacher.
             */
            return this.re.teacher.photoURL;
        }
    }
    teacher_idx(sessions: Array<SESSION>): string {
        const teacher = this.teacher(sessions[0]);
        return teacher.idx;
    }


    schedule(idx_schedule): SCHEDULE_COMPRESSED {
        if (typeof idx_schedule !== 'number' && typeof idx_schedule !== 'string') { // get idx schedule from session[0]
            idx_schedule = idx_schedule[this.N.idx_schedule]; // idx_schedule is session;
        }
        if (this.re.schedule && this.re.schedule[idx_schedule]) {
            return this.re.schedule[idx_schedule];
        } else {
            return null;
        }
    }

    session_time(sessions) {
        // console.log('session_time: ', sessions);
        if (!sessions || !sessions.length) {
            return 0;
        }
        const session = sessions[0];
        if (session[this.N.idx_schedule] === void 0) {
            return 0;
        }
        const schedule = this.schedule(session[this.N.idx_schedule]);
        if (!schedule) {
            return 0;
        }
        // console.log('schedule: ', schedule, this.N.user_time_class_begin);
        const begin = schedule[this.N.user_time_class_begin];
        // console.log('begin: ', begin);
        const hour = begin.substr(0, 2);
        const minute = begin.substr(2, 2);
        return hour + ':' + minute;
    }
    session_duration(sessions) {

        if (!sessions || !sessions.length) {
            return 0;
        }
        const session = sessions[0];
        if (session[this.N.idx_schedule] === void 0) {
            return 0;
        }
        const schedule = this.schedule(session[this.N.idx_schedule]);
        if (!schedule) {
            return 0;
        }
        return schedule[this.N.duration];

    }

    /**
     * Returns teacher name after sanitizing ( shorten )
     * @param sessions a session
     */
    teacher_name(sessions: Array<any> = null): string {
        let name = 'No Name';
        if (!sessions || !sessions.length) {
            return null;
        }
        const session = sessions[0];
        // console.log(session);
        const teacher = this.teacher(session);
        // console.log('teacher: ', teacher);
        if (teacher) {
            name = teacher.name;
        } else {
            name = this.re.teacher['name'];
        }
        // return name;

        return this.a.preTeacherName(name, 7, '...');
    }

    teacher_group(session): string {
        const teacher = this.teacher(session);
        if (teacher) {
            return teacher.user_group;
        } else {
            return this.re.teacher.user_group;
        }
    }


    onClickSession(session: SESSION) {

        // console.log('onClickSession', session);
        if (session['in_progress'] === true) {
            // console.log("It is reserving/cancelling... return");
            return;
        }

        if (session[N.status] === N.session_past) {
            return;
        }
        if (session[N.open] === N.session_open) {
            this.reserveSession(session);
        } else if (session[N.open] === N.session_reserved && session[N.owner] === 'me') {
            this.cancelSession(session);
        }
        this.a.cacheDeleteSchedule();
    }


    reserveSession(session: SESSION) {

        // console.log("reserve: session: ", session);
        // const schedule = this.schedule(session[ this.IDX_SCHEDULE ]);
        // console.log("reserve: schedule: ", schedule);

        session['in_progress'] = true;
        this.a.lms.session_reserve({ idx_schedule: session[N.idx_schedule], date: session[N.date] }).subscribe(re => {

            /**
             * @since 2018-06-20 This was added due to `Cannot read property of 'schedule' of null`.
             *      This happens when student has already left schedule table or in another teacher's schedule table
             *          while the reservation or canncellation is in progress of a teacher's schedule
             */
            if (!this.re) {
                // console.log('Schedule table information has been destoryed. this.re is null. so, just return.');
                return null;
            }

            // console.log("class_reserve: ", re);

            // setTimeout(() => session['in_progress'] = false, 500);
            session['in_progress'] = false;

            session[N.open] = N.session_reserved;
            session[N.dayoff] = '';
            session[N.status] = N.session_future;
            session[N.owner] = 'me';
            session[N.student_name] = re.student_name;
            session[N.point] = re.point;
            session[N.idx_reservation] = re.idx_reservation;
            this.a.updateLmsInfoUserNoOfTotalSessions(re['no_of_total_sessions']);
            this.a.updateLmsInfoUserNoOfReservation(re['no_of_reservation']);
            this.a.updateUserPoint((() => {
                this.pointHasBeenUpdated = true;
                setTimeout(() => this.pointHasBeenUpdated = false, 5000);
            }));
            this.a.onLmsReserve(this.teacher_name([session]));
            if (this.teacher_group(session) === 'withcenter') {
                // this.a.toast( this.a.ln.WITHCENTER_TEACHER_RESERVE_REMINDER );
            }
        }, e => {
            session['in_progress'] = false;
            // console.log('reserve e: ', e);
            this.a.toast(e);
        });

    }

    cancelSession(session: SESSION) {
        session['in_progress'] = true;
        // console.log("Going to cancel with : ", session[ this.IDX_RESERVATION ]);
        this.a.lms.session_cancel(session[N.idx_reservation]).subscribe(re => {

            /**
             * @since 2018-06-20 This was added due to `Cannot read property of 'schedule' of null`.
             *      This happens when student has already left schedule table or in another teacher's schedule table
             *          while the reservation or canncellation is in progress of a teacher's schedule
             */
            if (!this.re) {
                // console.log('Schedule table information has been destoryed. this.re is null. so, just return.');
                return null;
            }
            // console.log("cancel success", re);
            session['in_progress'] = false;
            session[N.status] = N.session_future;
            session[N.open] = N.session_open;
            session[N.owner] = '';
            session[N.student_name] = '';
            session[N.point] = this.schedule(session[N.idx_schedule])[N.point];
            this.a.updateLmsInfoUserNoOfTotalSessions(re['no_of_total_sessions']);
            this.a.updateLmsInfoUserNoOfReservation(re['no_of_reservation']);
            this.a.updateUserPoint((() => {
                this.pointHasBeenUpdated = true;
                setTimeout(() => this.pointHasBeenUpdated = false, 5000);
            }));
            this.a.onLmsCancel(this.teacher_name([session]));
        }, e => {
            session['in_progress'] = false;
            this.a.toast(e);
        });
    }


    icon(session: SESSION) {
        if (session[N.status] === N.session_future) {
            if (session[N.open] === N.session_open) { // open to reserve
                if (session[N.dayoff] === 'dayoff') {
                    return 'cloud-circle'; // but day off
                }
                if (session[N.prere]) {
                    return 'heart';
                } else {
                    return 'radio-button-off'; // reservable
                }
            } else if (session[N.open] === N.session_reserved) { // already reserved.
                if (session[N.owner] === 'me' && !session[N.dayoff]) {
                    return 'radio-button-on';
                } else if (session[N.dayoff] === 'dayoff') {
                    return 'cloud-done'; // already reserved and day-off
                } else {
                    return 'checkmark'; // reserved
                }
            } else if (session[N.open] === N.session_no_schedule) { // teacher didn't open a session on this day of his schedule table.
                return 'qr-scanner'; // no schedule on this day.
            }
        } else { /// past classes.
            if (session[N.open] === N.session_open) { // past class. but open.
                return 'square';
            } else { // past & reserved.
                if (session[N.dayoff] === 'dayoff') {
                    return ''; // past class and dayoff.
                } else {
                    return 'lock'; // past class and reserved.
                }
            }
        }
    }


    /// teacher profile

    /**
     * Teacher's age
     */
    // teacher_age() {
    //     return this.re.teacher.age;
    // }
    // teacher_grade() {
    //     return this.re.teacher.grade;
    // }
    // teacher_gender() {
    //     // console.log(this.re.teacher);
    //     return this.re.teacher.gender;
    // }



}

