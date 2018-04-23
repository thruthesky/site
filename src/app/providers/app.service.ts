import { Injectable, NgZone } from '@angular/core';
import { LanguageService } from './language.service';
import { Router, NavigationExtras, NavigationStart } from '@angular/router';
import { Base, FireService } from '../modules/firelibrary/core';
import { XapiService, XapiUserService, XapiFileService, XapiLMSService } from '../modules/xapi/xapi.module';

import { CODE_USER_NOT_FOUND_BY_THAT_EMAIL, CODE_WRONG_SESSION_ID, CODE_NO_USER_BY_THAT_SESSION_ID } from '../modules/xapi/error';


/**
 * Firebase initialization.
 */
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import env from '../../environment';
import { SCHEDULE_TABLE } from '../modules/xapi/interfaces';
/**
 * Material SnackBar is included in AppService since it is being used everywhere.
 * It should be used in even app.component or home component page of each site.
 */
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
firebase.initializeApp(env['firebaseConfig']);


export const SITE_KATALKENGLISH = 'katalkenglish';
export const SITE_ONTUE = 'ontue';
export const SITE_WITHCENTER = 'withcenter';

export const KEY_SCHEDULES = 'key-schedules';
const SCHEDULE_CACHE_INTERVAL = 1800; // 1 for 1 second. 1800 for 30 min. 3600 for 1 hour.


export const KEY_WEEKEND = 'key-weekend';
export const KEY_DAYS = 'key-days';


export interface SITE {
    ontue: boolean;
    withcenter: boolean;
    katalkenglish: boolean;
}

export interface SCHEDULE_OPTIONS {
    teachers: Array<number>;
    days: number;
    min_duration: number;
    max_duration: number;
    navigate: string;
    starting_day: string;
    display_weekends: string;
    min_point: number;
    max_point: number;
    class_begin_hour: number;        // Loads schedule btween 00:00 am and 23:59 pm.
    class_end_hour: number;          // Loads schedule btween 00:00 am and 23:59 pm.
    useCache: boolean;
}

const KEY_LMS_INFO = 'lms-info';
const firestoreLogCollection = 'user-activity-log';

@Injectable()
export class AppService {
    // color: string = null;

    /**
     * If true app should show header. if false, app should hide header.
     */
    showHeader = true;

    /**
     * It prepares site code on booting. So, it won't be computed again on run time.
     * Use this whenever you need to determin if the user is using Stduent site or Teacher site
     *      and inside template whenever you need site code.
     *
     * This will not recompute anything and it's good to use in template.
     * @code
     *      <section id="ontue" *ngIf=" a.site.ontue ">
     *      if ( this.a.site.katalkenglish ) { ... }
     */
    site: SITE = {
        ontue: false,
        katalkenglish: false,
        withcenter: false
    };

    urlBackend: string;
    /**
     * User's default photo
     */
    anonymousPhotoURL = 'assets/img/anonymous.png';

    /**
     * LMS information from backend.
     * @note this is being called once very boot.
     * @attention this must be the only variable to be used to display LMS information.
     */
    info = null;

    /**
     * Push Token
     * @type string
     */
    pushToken: string = null;


    /**
     * Firebase Notification and Messaging
     *
     * @todo naming. `firebase` instead of `_firebase`.
     */
    _firebase: {
        db: firebase.firestore.Firestore;
        messaging: firebase.messaging.Messaging;
    } = { db: null, messaging: null };

    /**
     * Activity Log of All Site
     */
    activity_log = [];


    /**
     * Loader for loading my point.
     */
    inLoadingMyPoint = false;


    constructor(
        public ngZone: NgZone,
        public router: Router,
        public fire: FireService,
        public snackBar: MatSnackBar,
        public language: LanguageService,
        public xapi: XapiService,
        public user: XapiUserService,
        public file: XapiFileService,
        public lms: XapiLMSService) {
        // console.log(`AppService::constructor()`);
        // this.setColor('white');


        Base.collectionDomain = 'database';
        this.site[this.getSite()] = true;

        this.urlBackend = env['urlBackend'];
        console.log('urlBackend: ', this.urlBackend);
        xapi.setServerUrl(this.urlBackend);


        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationStart) {
                if (this.router.url === e.url) {
                    console.log('same url');
                    this.router.navigate(['/redirect'], { queryParams: { url: e.url } });
                }
            }
        });


        this._firebase.db = firebase.firestore();
        this._firebase.messaging = firebase.messaging();
        // this.language.setUserLanguage();
    }


    /**
     * Short for `fire.t()`
     * @param code code
     * @param info info
     */
    t(code, info?) {
        return this.fire.t(code, info);
    }


    get isLogin() {
        return this.user.isLogin;
    }

    get isLogout() {
        return this.user.isLogout;
    }

    // setColor(color) {
    //     // this.color = color;
    //     // console.log(`Color has been set to ${this.color}`);
    // }

    getDomain() {
        return window.location.hostname;
    }

    /**
     * Returns user domain.
     * If the domain is 'localhost', then it returns 'localhost.com'
     */
    // getDomainAsEmailDomain() {
    //     const domain = this.getDomain();
    //     if (domain === 'localhost') {
    //         return 'localhost.com';
    //     } else {
    //         this.getDomain();
    //     }
    // }

    /**
     * Returns an email address of the user ID.
     * @param ID User ID of WordPress Backend
     */
    getFirebaseLoginEmail(ID): string {
        return 'user' + ID + '@wordpress.com';
    }


    private isKatalkenglishDomain() {
        return this.getDomain().indexOf(SITE_KATALKENGLISH) !== -1;
    }

    private isOntueDomain() {
        return this.getDomain().indexOf(SITE_ONTUE) !== -1;
    }

    private isWithcenterDomain() {
        return this.getDomain().indexOf(SITE_WITHCENTER) !== -1;
    }

    get studentTheme() {
        return this.site.katalkenglish;
    }

    get teacherTheme() {
        return this.site.ontue;
    }


    /**
     * Returns site code.
     */
    getSite() {
        if (this.isKatalkenglishDomain()) {
            return SITE_KATALKENGLISH;
        } else if (this.isOntueDomain()) {
            return SITE_ONTUE;
        } else if (this.isWithcenterDomain()) {
            return SITE_WITHCENTER;
        } else {
            return SITE_KATALKENGLISH;
        }
    }


    get homeUrl() {
        if (this.site.katalkenglish) {
            return '/';
        } else if (this.site.ontue) {
            return '/teacher';
        } else if (this.site.withcenter) {
            return 'franchise';
        } else {
            return '/';
        }
    }

    /**
     * Returns an object of keys/values of the HTTP query parameter.
     * @returns
     *      null if there is no Query String.
     *      Object of keys/values.
     *
     * @code
     *      console.log(this.getQueryString());
     *
     * @example
     *      Input: http://katalkenglish.org:4200/install/the/system?a=b&c=d
     *      Output: {a: "b", c: "d"}
     */
    getQueryString() {
        if (window.location.href.indexOf('?') === -1) {
            return null;
        }
        const vars = {};
        const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    /**
     * Returns the paths in an array.
     *
     * @example
     *      Input: http://katalkenglish.org:4200/install/the/system?a=b&c=d
     *      Output: ["install", "the", "system"]
     *
     *      Input: http://ontue.org:4200/
     *      Output: []
     *
     */
    getQuerySegments() {
        const location: Location = window.location;
        let path = location.href;
        /**
         * Remove after '?'
         */
        if (path.indexOf('?') !== -1) {
            path = location.href.substr(0, location.href.indexOf('?'));
        }
        /**
         * Remove first part. before instiali '/' for path.
         */
        path = path.replace('//', '');
        if (path.indexOf('/') === -1) { // if there is no '/'. it has no segment. @note all the URL shuold have ending '/'.
            return [];
        }
        path = path.substr(path.indexOf('/') + 1);
        if (!path) {
            return [];
        }

        return path.split('/');
    }

    /**
     * Re-draw the template view.
     * Call this method after asynchronous data display in view.
     * @param timeout timeout
     */
    rerender(timeout: number = 0) {
        setTimeout(() => this.ngZone.run(() => {
        }), timeout);
    }

    render(t?) {
        this.rerender(t);
    }

    /**
     * Pass params to a page.
     * @param url url to move
     * @param params Params to deliver
     *
     * @example this.a.open('payment-result', { result: false, message: '결제를 취소하였습니다. You have cancelled the payment.' });
     */
    open(url: string, params?) {
        const navigationExtras: NavigationExtras = {
            queryParams: params,
            fragment: ''
        };
        this.router.navigate([url], navigationExtras);
    }

    /**
     * Move the route to domain's Home
     */
    openHome() {
        this.open(this.homeUrl);
    }

    openProfile() {
        this.open('/profile');
    }


    /**
     * Display a toast/snack bar at the bottom of the page.
     *
     * It closes the 'loader' box. normally, 'loader' will be opened for http request.
     *
     * @param o option to display a toast
     *
     *      It can be
     *          - a string.
     *          - an Error object of Javascripit 'Error' class
     *          - an object of { title: '...', message: '...' }
     *
     * @code
     *      x.subscribe(re => re, e => this.a.toast( e )
     *
            a.toast('Hello, Alert !');
            a.toast( { title: 'title', message: 'message' );
            a.toast( new Error('This is an error alert') );

     * @endcode
     */
    toast(o) {
        if (!o) {
            o = { message: 'No toast message' };
        } else if (typeof o === 'string') { // Mostly a message to user
            o = { message: o };
        } else if (o instanceof Error) { // Mostly an error code from backend.

            console.log('error from server?', o);
            const code = this.xapi.getError(o).code;
            o = {
                message: this.xapi.getError(o).message,
                panelClass: 'error' + code
            };

            /**
             * Login session invalid.
             *
             * When user's login session is not valid anymore, logout.
             * It rewrite the error message.
             *
             * @see README ### Firebase User Login and Session
             */
            if (code === CODE_WRONG_SESSION_ID || code === CODE_NO_USER_BY_THAT_SESSION_ID) {
                this.user.logout();
                // console.log( this.fire.getText() );
                o['message'] = this.fire.t('LOGIN_INVALID'); // rewrite error message.
            } else if (code === CODE_USER_NOT_FOUND_BY_THAT_EMAIL) {
                o['message'] = this.fire.t('CODE_USER_NOT_FOUND_BY_THAT_EMAIL');
            }

        } else if (o instanceof HttpErrorResponse) { // PHP ERROR. backend wordpress response error. status may be 200.
            console.log('error of http: ', o);
            /**
             * @todo This error happens rarely. @see https://github.com/thruthesky/ontue/issues/192
             * @todo try to produce php error and display error log on console.
             * @todo Sometimes, somehow, the error disappears and cannot be reproduced.
             */
            if (o.status === 0) {
                o = { message: this.fire.ln.NO_INTERNET };
            } else if (o.status === 200) {
                o = { message: this.fire.ln.PHP_ERROR };
            } else {
                o = { message: o.message };
            }
        } else if (o.message === void 0) {
            o['message'] = 'No message';
        }
        const defaults = {
            duration: 8000,
            action: this.fire.ln['CLOSE'],
            panelClass: 'toast'
        };
        o = Object.assign(defaults, o);
        console.log('o:', o);
        const snackBarRef = this.snackBar.open(o.message, o.action, {
            duration: o.duration,
            panelClass: o.panelClass
        });


        // if (msg.message) {
        //     alert(msg.message);
        // } else {
        //     alert(msg);
        // }
    }

    /**
     * Returns a random string.
     * @param prefix Prefix to add infront of the random string
     */
    randomString(prefix = ''): string {
        return prefix + (+new Date).toString(36).slice(-5);
    }


    logout(options?) {
        console.log(`logout( options? ) `, options);
        this.fire.user.logout().then(() => {
            this.user.logout();
            if (options['open']) {
                this.open(options['open']);
            }
        });
    }

    get isManager() {
        return !!this.user.manager;
    }

    get isAdmin() {
        return this.user.manager && this.user.manager === '*';
    }

    get isMyBranch() {
        return this.user.manager && this.user.manager === this.getDomain();
    }

    get isTeacher(): boolean {
        if (this.isLogout) {
            return false;
        }
        return this.lms.getUserType() === 'teacher';
    }

    /**
     * Returns true of the login use is a student.
     *
     * It compares with the user type.
     */
    get isStudent(): boolean {
        if (this.user.isLogout) {
            return false;
        }
        return this.lms.getUserType() !== 'teacher';
    }


    /**
     * Adds '0' infront of the `n` if the `n` is smaller than 10.
     * @param n numbre
     * @example
     *      add0(1);
     *      - input:  1
     *      - output: 01
     */
    add0(n: number): string {
        if (!n) {
            return;
        }
        return n < 10 ? '0' + n : n.toString();
    }


    /**
     * Return teacher name after sanitizing it.
     * @param name Teacher name
     * @param length Number of maximum name length
     */
    shortName(name: string, length = 8, def = 'No Name') {

        if (!name) {
            return def;
        }
        if (name.length > length) {
            name = name.slice(0, length);
        }
        return name;

    }

    /**
     * same as shortName. For backward compatibilities.
     * @param name same as shortName
     * @param length same as shortName
     * @param def same as shortName
     */
    preTeacherName(name, length = 8, def = 'No Name') {
        return this.shortName(name, length, def);
    }




    dateTime(stamp: any) {
        stamp = parseInt(stamp, 10);
        if (!stamp) {
            return 0;
        }
        const d = new Date(stamp * 1000);
        return d.toLocaleString();
    }

    /**
     * return number of stars.
     * @param grade grade
     */
    countStar(grade) {
        grade = parseInt(grade, 10);
        if (grade >= 5) {
            grade = 5;
        }
        const re = Array(grade).fill(true);
        return re;
    }

    getUnixTimestamp() {
        return Math.round((new Date()).getTime() / 1000);
    }


    /**
     * Returns a `key` for saving cached schedule table data into localStorage.
     * @param options schedule table search options
     */
    cacheKeySchedule(options: SCHEDULE_OPTIONS) {
        let key = KEY_SCHEDULES;
        key += '-' + options.teachers.toString();
        console.log('cacheKeySchedule:', key);
        return key;
    }



    // /**
    //  * Returns key for schedule table search based on the search options.
    //  *
    //  * It can cache for each teacher. It should cache only for first page loading.
    //  *
    //  * @param options Options
    //  */
    // cacheKeySchedule(options: SCHEDULE_OPTIONS) {
    //     let key = KEY_SCHEDULES;
    //     key += '-' + options.class_begin_hour;
    //     key += '-' + options.class_end_hour;
    //     key += '-' + options.days;
    //     key += '-' + options.display_weekends;
    //     key += '-' + options.max_duration;
    //     key += '-' + options.max_point;
    //     key += '-' + options.min_duration;
    //     key += '-' + options.min_point;
    //     key += '-' + options.navigate;
    //     key += '-' + options.teachers.toString();
    //     console.log('cacheKeySchedule:', key);
    //     return key;
    // }

    /**
     * Caches schedule table for `first schedule table` list only.
     *
     * Only caches for 'first schedule table' without any search options.
     * `options.useCache` is set to `true` only once in `constructor` of 'schedule-table.page.ts'
     * so, if user reset the options or navigate, then it will not use cache.
     * Even if the user navigate 'tomorrow' and navigate back to 'first schedule table' it does not use cache since it has navigated.
     * Again, ONLY the first schedule load triggerred within 'constructor' or 'schedule-table-page.ts'.
     * When a reservation/cancellation happens, all the cache is deleted.
     */
    cacheSetSchedule(re, options: SCHEDULE_OPTIONS) {
        // if ( options.navigate !== 'today' ) {
        //     return;
        // }
        if (options.useCache) {
            re['time'] = this.getUnixTimestamp();
            const key = this.cacheKeySchedule(options);
            this.set(key, re);
        }
    }

    /**
     * Returns cached schedule data.
     * @param options options
     */
    cacheGetSchedule(options: SCHEDULE_OPTIONS): SCHEDULE_TABLE {
        const key = this.cacheKeySchedule(options);
        // const key = KEY_SCHEDULES;
        const re = this.get(key);
        if (re && re['time']) {
            const timeCache = parseInt(re['time'], 10);
            const timeNow = this.getUnixTimestamp();
            const passed = timeNow - timeCache;

            if (passed < SCHEDULE_CACHE_INTERVAL) {   //
                const left = SCHEDULE_CACHE_INTERVAL - passed;
                console.log(`Using cached schedule data. Cache Expiration Interval: ${SCHEDULE_CACHE_INTERVAL}. Time now(${timeNow}) - Time cached(${timeCache}) = ${passed} seconds has passed. and ${left} seconds left to re-cache.`);
                // console.log(`Using Cached schedule. ${left} seconds left for update.`);
                // return null;
                return re;
            } else {
                console.log(`Cached data has expired. Cache interval: ${SCHEDULE_CACHE_INTERVAL} but, ${passed} has passed. timeCache: ${timeCache}, timeNow: ${timeNow}. Going to get new data.`);
                return null;
            }
        } else {
            console.log('No cached data. Going to load all teacher schedules');
            return null;
        }
    }
    /**
     * Removing cached schedule table data only.
     */
    cacheDeleteSchedule() {
        const keys = Object.keys(localStorage);
        console.log('cacheDeleteSchedule. Keys: ', keys);
        if (keys) {
            for (const key of keys) {
                if (key.indexOf(KEY_SCHEDULES) !== -1) {
                    console.log('removing : ', key);
                    localStorage.removeItem(key);
                }
            }
        }
        // this.set(KEY_SCHEDULES, null);
    }

    /**
     * Get schedule table(s)
     * @param options Pass options
     *  options['teachers'] = [ 123, 456, 789 ]; /// to show three teacher's schedule table.
     * @param callback callback
     */
    loadSchedule(options: SCHEDULE_OPTIONS = <any>{}, callback: (re: SCHEDULE_TABLE) => void) {

        /**
         * Default options.
         */
        const defaults: SCHEDULE_OPTIONS = {
            teachers: [],
            days: 7,
            min_duration: 0,
            max_duration: 160,
            navigate: 'today',
            starting_day: '',
            display_weekends: 'Y',
            min_point: 0,
            max_point: 100000,
            class_begin_hour: 0,        // Loads schedule btween 00:00 am and 23:59 pm.
            class_end_hour: 24,          // Loads schedule btween 00:00 am and 23:59 pm.
            useCache: false
        };


        options = Object.assign({}, defaults, options);

        /**
         * Use cached data for all schedule table.
         */
        if (options.useCache) {
            const schedules = this.cacheGetSchedule(options);
            if (schedules) {
                console.log('got cached schedule. length of table: ', schedules.table.length);
                callback(schedules);
                return;
            }
        }

        this.lms.schedule_table_v4(options).subscribe(re => {
            if (!re) { // something is wrong.
                callback(re); // just call the callback with the data even if something is wrong.
            }
            if (re && re.schedule) {
                const keys = Object.keys(re.schedule);
                if (keys.length) {
                    console.log('re.schedule.length:', keys.length);
                    for (const idx of keys) {
                        const s = re.schedule[idx];
                        // console.log('s: ', s);
                        const arr = s.split(',');
                        const newSchedule = {};
                        newSchedule['t'] = arr[0];
                        newSchedule['b'] = arr[1];
                        newSchedule['u'] = arr[2];
                        newSchedule['p'] = arr[3];
                        newSchedule['a'] = arr[4];
                        re.schedule[idx] = newSchedule;
                    }
                }
            }
            if (re && re.table && re.table.length) {
                for (let i = 0; i < re.table.length; i++) {
                    const sessions = <Array<string>>re.table[i];
                    const newSessions = [];
                    for (const s of sessions) {
                        const arr = s.split(',');
                        // console.log('arr: ', arr);
                        const session = {};
                        session['d'] = arr[0];
                        if (arr[1]) {
                            session['e'] = arr[1];
                        } else {
                            session['e'] = newSessions[0]['e'];
                        }
                        session['f'] = arr[2];
                        session['i'] = arr[3];
                        session['n'] = arr[4];
                        session['o'] = arr[5];
                        session['p'] = arr[6];
                        session['r'] = arr[7];
                        session['s'] = arr[8];
                        session['w'] = arr[9];
                        newSessions.push(session);
                    }
                    re.table[i] = newSessions;
                }
            }

            // console.log('optins: ', options);
            this.cacheSetSchedule(re, options);

            // console.log('new: ', re);
            callback(re);
        }, e => this.toast(e));

        // this.lms.schedule_table(options).subscribe(re => {
        //     console.log('old: ', re);
        //     callback(re);
        // });
    }
    deleteScheduleCache() {
        this.set(KEY_SCHEDULES, null); /// new code. When a session is clicked. delete old schedule cache.
    }

    /**
     * Get the value of the key from localStorage
     * @param key key of localStorage
     * @return it can be an object or a scalar.
     */
    get(key: string): any {
        return this.xapi.get(key);
    }

    /**
     * Saves value into localStorage.
     *
     * All data saving to `localStorage` must use this method. This method does safe try/catch {} error handling.
     *
     * @param key key of localStorage
     * @param value value to save. it can be an object or a scalar. It will be JSON.stringyfy(). So no need to do it.
     */
    set(key: string, value: any) {
        return this.xapi.set(key, value);
    }


    /**
     *
     *      Gets LMS information from backend and saves into localStorage.
     *
     *      And initialize LMS information.
     *
     *          - Runs timer for local timzeone.
     *
     *
     * @note to get LMS information after loading from backend, use
     *      - this.lmsInfoUserNoOfTotalSessions
     *      - this.lmsInfoUserNoOfReservation
     *      - this.lmsInfoUserNoOfTotalPast
     *      - this.lmsInfo('SELLER_RATE')
     *
     * @param callback - You can use callback to get the result data from backend.
     *
     * @attention use this method to get user information.
     *          Once this method is being used, the app gets NOT only the user information
     *          BUT also it saves into localStorage.
     *
     * @note if you only want to get user point, consider using "loadMyPoint()". It's more convenient to only get point.
     */
    updateLMSInfo(callback = null) {
        this.info = this.get(KEY_LMS_INFO);
        if (!this.info) {
            this.info = {};
        }
        this.lms.info().subscribe(re => {
            this.set(KEY_LMS_INFO, re);
            this.info = this.get(KEY_LMS_INFO);
            if (this.info['user'] !== void 0) {
                if (this.info['user']['no_of_total_sessions'] !== void 0) {
                    this.updateLmsInfoUserNoOfTotalSessions(this.info['user']['no_of_total_sessions']);
                }
                if (this.info['user']['no_of_reservation'] !== void 0) {
                    this.updateLmsInfoUserNoOfReservation(this.info['user']['no_of_reservation']);
                }
                if (this.info['user']['no_of_past'] !== void 0) {
                    this.updateLmsInfoUserNoOfPast(this.info['user']['no_of_past']);
                }
            }
            if (callback) {
                callback(re);
            }
        }, e => {
            console.error(e);
        });
    }


    /**
     * Saves number of total sessions into localStorage
     * User this.lmsInfoUserNoOfTotalSessions to get the number.
     * @param count number of total sessions
     */
    updateLmsInfoUserNoOfTotalSessions(count) {
        this.set('no_of_total_sessions', count);
    }

    updateLmsInfoUserNoOfReservation(count) {
        this.set('no_of_reservation', count);
    }

    updateLmsInfoUserNoOfPast(count) {
        this.set('no_of_past', count);
    }


    /**
     * Returns total number of sessions of the login user.
     * it includes past and future.
     */
    get lmsInfoUserNoOfTotalSessions(): number {
        const count = this.get('no_of_total_sessions');
        if (!count) {
            return 0;
        }
        return parseInt(count, 10);
    }

    /**
     * Returns number of past sessions.
     */
    get lmsInfoUserNoOfPast(): number {
        const count = this.get('no_of_past');
        if (!count) {
            return 0;
        }
        return parseInt(count, 10);
    }

    /**
     * Returns number of reservarions.
     */
    get lmsInfoUserNoOfReservation(): number {
        const count = this.get('no_of_reservation');
        if (!count) {
            return 0;
        }
        return parseInt(count, 10);
    }

    /**
     * @note don't call this method twice.
     *
     * - It request permission to the user.
     * - If user accepts ( or already accepted )
     *      a) check if token updated/changed, if yes, then update it.
     *      b) or don't do anything.
     */
    onetimeInitPushMessage() {
        this.initWebPushMessage();
    }


    initWebPushMessage() {
        if ('Notification' in window) {
            console.log('initWebPushMessage', this._firebase);
            this._firebase.messaging.requestPermission()
                .then(() => { /// User accepted 'push notification alert'
                    this._firebase.messaging.getToken()
                        .then(currentToken => { /// Got token
                            this.pushToken = currentToken;
                            // console.log("Got token: ", this.pushToken);
                            this.updatePushToken();
                        })
                        .catch(err => {
                            // Failed to get token.
                            console.error('An error occurred while retrieving token. ', err);
                        });
                })
                .catch(err => { /// If failed to get permission.
                    console.error('User rejected/blocked push notification. ', err);
                });
            // Callback fired if Instance ID token is updated.
            this._firebase.messaging.onTokenRefresh(() => {
                this._firebase.messaging.getToken()
                    .then(refreshedToken => { // Token refreshed
                        this.pushToken = refreshedToken;
                        // console.log("Token Refreshed: ", this.pushToken);
                        this.updatePushToken();
                    })
                    .catch(err => {
                        // console.log('Unable to retrieve refreshed token ', err);
                    });
            });

            // When the user is on the site(opened the site), the user will not get push notification.
            // Instead, you can do whatever in this handler.
            this._firebase.messaging.onMessage(payload => {
                // console.log("Message received. ", payload);
                // ...
                const notification = payload['notification'];
                // const title = notification['title'];
                const body = notification['body'];
                this.toast(body);
            });
        }
    }


    /**
     * Gets push token string and update it to server only IF it's new.
     * @param token push token string
     */
    updatePushToken() {
        const platform = 'web';
        if (!this.pushToken) {
            console.log('updatePushToken(): token is empty. It will not update. just return.');
            return;
        }
        this.lms.update_push_token(this.pushToken, platform).subscribe(re => {
            // console.log("Token updated:");
        }, e => console.error(e));
    }


    /**
     * Log whenever user login
     */
    onUserLogin() {
        this.updateLMSInfo();
        this.updatePushToken();
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'login' });
        // console.log("userLogin::Log::");
    }

    /**
     * This method is being called when a user opens 'register' page.
     */
    onUserRegisterPage() {
        this.updatePushToken();
        this.log({ activity: 'open-register' });
    }

    onUserRegister() {
        this.updateLMSInfo();
        this.updatePushToken();
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'register' });
    }

    onUserProfileUpdate() {
        this.updateLMSInfo();
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'update-profile' });
    }


    onLmsReserve(teacher_name) {
        if (!teacher_name) {
            return;
        }
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'reserve', target: teacher_name });
    }

    /**
     * Student and teacher can cancel a class. If a student cancells a class on schedule table, teacher name will have teacher name.
     * If a sesison is cancelled on session reservation list, then there will be no name on teacher name variable.
     * @param teacher_name teacher name of the session
     */
    onLmsCancel(teacher_name = '') {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'cancel', target: teacher_name });
    }

    onUserViewProfile(teacher_name) {
        if (!teacher_name) {
            return;
        }
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'view-profile', target: teacher_name });
    }

    onBeginPayment() {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'payment' });
    }

    onTeacherEvaluateSession(student_name = '') {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'evaluate', target: student_name });
    }

    onStudentCommentToTeacher(teacher_name = '') {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'comment', target: teacher_name });
    }


    log(data) {
        // data['name'] = 'test' + (new Date).getTime();
        data['stamp'] = firestore.FieldValue.serverTimestamp();
        // console.log(data);
        const col = this._firebase.db.collection(firestoreLogCollection);
        col.add(data)
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                // col.doc( docRef.id ).get().then( doc => console.log('got doc: ', doc.data()));
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
    }

    listenActivityLog() {

        if (!this.teacherTheme) {
            return;
        }
        const db = this._firebase.db;


        db.collection(firestoreLogCollection)
            .orderBy('stamp', 'desc')
            .limit(10)
            .get().then(s => {
                s.forEach(doc => {
                    const data = doc.data();
                    data['id'] = doc.id;
                    data['date'] = this.serverTime(data['stamp']);
                    this.activity_log.push(data);
                });
            }).catch(error => {
                console.log('Error getting document:', error);
            });

        db.collection(firestoreLogCollection)
            .orderBy('stamp', 'desc')
            .limit(1)
            .onSnapshot(shot => {
                shot.forEach(doc => {
                    const data = doc.data();
                    data['id'] = doc.id;
                    data['date'] = this.serverTime(data['stamp']);
                    const i = this.activity_log.findIndex(v => v['id'] === doc.id);
                    if (i !== -1) {
                        this.activity_log[i] = data;
                    } else {
                        this.activity_log.unshift(data);
                        this.activity_log.pop();
                    }
                });
            }, error => {
                console.log('snap error::', error);
            });
    }

    serverTime(obj) {
        const d = new Date(obj);
        return d.toLocaleTimeString();
    }




    /**
     * Returns `thousands comma` format.
     *
     * @todo This method looks like overloading processor.
     *
     * @todo consider to user number pipe.
     * @param n number
     */
    number_format(n) {
        return n.toString().split('').reverse().reduce((t, v, i, a) => {
            return t += v + (i < a.length - 1 && (i + 1) % 3 === 0 ? ',' : '');
        }, '').split('').reverse().join('');
    }


    /**
     * Loads user point.
     * @note inLoadingMyPoint will be set true on loading.
     * @param callback callback
     */
    loadMyPoint(callback, loaderTmeout = 0) {
        this.inLoadingMyPoint = true;
        this.lms.my_point().subscribe(re => {
            let point = re['point'];
            point = this.number_format(point);
            setTimeout(() => this.inLoadingMyPoint = false, loaderTmeout);
            callback(point);
            this.render();
        }, e => {
            this.inLoadingMyPoint = false;
            this.toast(e);
        });
    }


    intval(n) {
        try {
            return parseInt(n, 10);
        } catch (e) {
            return 0;
        }
    }

    floatval(n) {
        try {
            return parseFloat(n);
        } catch (e) {
            return 0;
        }
    }

    /**
     * IE 버전을 리턴한다.
     * 숫자로 8,9,10,11, 12, 13 을 리턴한다.
     * IE 가 아니면 거짓을 리턴한다.
     * 예를 들어 Edge 나 Chrome 은 false 를 리턴한다.
     */
    detectIE() {
        return window['detect_ie_version']();
    }

    onClickContactAdmin() {
        //
    }



    /**
     * Display short date
     * @param stamp unix timestamp
     */
    shortDate(stamp) {

        const d = new Date(stamp * 1000);
        const today = new Date();

        let dt;
        if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
            dt = d.toLocaleString();
            dt = dt.substring(dt.indexOf(',') + 2).toLowerCase();
            dt = dt.replace(/\:\d\d /, ' ');
        } else {
            dt = d.getFullYear().toString().substr(2, 2) + '-' + d.getMonth() + '-' + d.getDate();
        }
        return dt;
    }


    /**
     * Returns true if the user is using IE or Edge.
     */
    isIeEdge() {
        return !!window['ie_version'];
    }
    warningIeEdge() {
        if (this.isIeEdge()) {
            setTimeout(() => {
                this.toast({
                    message: this.fire.ln.IE_EDGE_WARNING,
                    panelClass: 'ie-version'
                });
            }, 500);
        }
    }


    /**
     * Returns true if the width of the view is less than 768px.
     *
     * It assumes that the device is 'mobile' if the width is smaller than 768px.
     */
    isMobileView(): boolean {
        const width = window.innerWidth;
        return width < 768;
    }

    isDesktopView(): boolean {
        return !this.isMobileView();
    }
}
