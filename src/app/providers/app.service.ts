import { Injectable, NgZone } from '@angular/core';
import { LanguageService } from './language.service';
import { Router, NavigationExtras, NavigationStart, NavigationEnd } from '@angular/router';
import { Base, FireService } from '../modules/firelibrary/core';
import { XapiService, XapiUserService, XapiFileService, XapiLMSService } from '../modules/xapi/xapi.module';

import { CODE_USER_NOT_FOUND_BY_THAT_EMAIL, CODE_WRONG_SESSION_ID, CODE_NO_USER_BY_THAT_SESSION_ID } from '../modules/xapi/error';


/**
 * Firebase initialization.
 */
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { environment } from './../../environments/environment';
import { SCHEDULE_TABLE } from '../modules/xapi/interfaces';
/**
 * Material SnackBar is included in AppService since it is being used everywhere.
 * It should be used in even app.component or home component page of each site.
 */
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
firebase.initializeApp(environment['firebaseConfig']);


export const SITE_KATALKENGLISH = 'katalkenglish';
export const SITE_ONTUE = 'ontue';
export const SITE_WITHCENTER = 'withcenter';

export const KEY_SCHEDULES = 'key-schedules';
const SCHEDULE_CACHE_INTERVAL = 1800; // 1 for 1 second. 1800 for 30 min. 3600 for 1 hour.


export const KEY_WEEKEND = 'key-weekend';
export const KEY_DAYS = 'key-days';
export const KEY_TEACHER_LIST = 'key-teacher-list';
export const KEY_LMS_INFO = 'lms-info';



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

export interface SHARE_SESSION_LIST {
    options: boolean;
    point: number;
    inLoadingPoint: boolean;
}




const firestoreLogCollection = 'user-activity-log';

@Injectable()
export class AppService {
    // color: string = null;


    /**
     * List of Countries
     */
    countries = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao, People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'];


    /**
     * If true app should show header. if false, app should hide header.
     * @since 2018-05-09 no more 'showHeader'
     */
    // showHeader = true;

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

    /**
     * It holds the url path of the current page.
     *
     * @example
     *      '/',
     *      '',
     *      '/admin',
     *      '/admin/user'
     */
    routeUrl = '';

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


    /**
     * It update the time every 10 seconds to display user time.
     *      - It runs on booting
     *      - and chagnes every 10 seconds.
     */
    userTime = '';


    /**
     * User's point is updated in this variable. Use this variable whereever.
     *
     * It updates when
     *      - app boots
     *      - whenever point chagnes
     *
     * If it is null, then it is loading.
     */
    userPoint: number = null;


    NO_SCHEDULE_PER_PAGE = 50;


    /**
     * No of days to show on past session in session-list
     */
    DEFAULT_DAYS_TO_SHOW_ON_PAST_PAGE = 90; // 90 days.

    constructor(
        public ngZone: NgZone,
        public router: Router,
        public snackBar: MatSnackBar,
        public readonly fire: FireService,
        public readonly language: LanguageService,
        public readonly xapi: XapiService,
        public readonly user: XapiUserService,
        public readonly file: XapiFileService,
        public readonly lms: XapiLMSService) {
        // console.log(`AppService::constructor()`);
        // this.setColor('white');


        Base.collectionDomain = 'database';
        this.site[this.getSite()] = true;

        this.urlBackend = environment['urlBackend'];
        console.log('urlBackend: ', this.urlBackend);
        xapi.setServerUrl(this.urlBackend);


        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationStart) {
                if (this.router.url === e.url) {
                    console.log('same url');
                    this.router.navigate(['/redirect'], { queryParams: { url: e.url } });
                }
            } else if (e instanceof NavigationEnd) {
                this.routeUrl = this.router.url;
            }

            /**
             * Scroll the page to the top after transitioning into another page.
             */
            if (e instanceof NavigationEnd) {
                window.document.body.scrollTop = window.document.documentElement.scrollTop = 0;
            }
        });

        // Just in case the app may need sometime to init.
        // Try to connect to the server first before it display the first page.
        setTimeout(() => {
            // console.log("going to call this.updateLMSInfo()");
            this.updateLMSInfo();
            if (this.user.isLogin) {
                this.log({ idx_user: this.user.id, name: this.user.name, activity: 'visit' });
            }
        }, 500);


        this._firebase.db = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true }; // 2018-05-07 backward compatibilities for firebase firestore new version.
        this._firebase.db.settings(settings);
        this._firebase.messaging = firebase.messaging();
        // this.language.setUserLanguage();

        setTimeout(() => {
            this.updateUserPoint();
        }, 1000);
        /**
         * Update user time
         */
        setInterval(() => {
            this.updateUserTimezone();
        }, 10000);

        fire.user.loginAnonymously();
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
        return 'user' + ID + '@php-wordpress-backend-server.com';
    }
    /**
     * It returns simple password.
     *
     * It does not care the security.
     * @see README ## Registration and ## Login
     *
     * @param ID User UID of backend
     */
    getFirebaseLoginPassword(ID): string {
        return 'password-' + ID;
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
        } else if (o instanceof Error) { // Mostly an response error code from backend.

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
                console.log('==> login session invalid. login again');
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

    alert(msg: string) {
        alert(msg);
    }

    /**
     * Returns a random string.
     * @param prefix Prefix to add infront of the random string
     */
    randomString(prefix = ''): string {
        return prefix + (+new Date).toString(36).slice(-5);
    }


    /**
     * This let user log out from Firebase and Wordpress PHP Backend and moves to a page.
     * @param options logout option
     */
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
        if (isNaN(n)) {
            return '00';
        }
        return n < 10 ? '0' + n : n.toString();
    }

    getYoutubeID(url) {
        if (!url) {
            return '';
        }
        const arr = url.split('v=');
        if (arr.length === 1) {
            return '';
        }
        const rest = arr[1].split('&');
        return rest[0];
    }

    /**
     * Returns url of embeded youtube.
     * @param ID Youtube video ID
     */
    getYoutubeUrl(ID) {
        let url = 'https://www.youtube.com/embed/' + ID;
        url += '?autoplay=1&loop=1';
        return url;
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

    countEmptyStar(grade) {
        grade = parseInt(grade, 10);
        if (grade >= 5) {
            grade = 5;
        }
        const re = Array(5 - grade).fill(true);
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
     *
     * @see README#KNOWN-BUG regarding cache
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
     * @see README#KNOWN-BUG regarding cache
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
     * @see README#KNOWN-BUG regarding cache
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
            // console.log('schedule_table_v4() result:', re);
            if (!re) { // something is wrong.
                console.error('Something went wrong with schedule_table_v4()');
                callback(re); // just call the callback with the data even if something is wrong.
            }
            if (re && re.schedule) {
                // console.log('re.schedule:', re.schedule);
                const keys = Object.keys(re.schedule);
                if (keys.length) {
                    // console.log('re.schedule.length:', keys.length);
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
            // console.log('re.table.lenght: ', re.table.length);
            if (re && re.table && re.table.length) {
                // console.log('it got table');
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


    lmsInfoCancellableMinutes() {
        if (this.info && this.info['MAX_CANCELLABLE_TIME']) {
            return parseInt(this.info['MAX_CANCELLABLE_TIME'], 10) / 60;
        } else {
            return 0;
        }
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
        if (environment['disableFirebaseUserActivityLog']) { return; } // development only
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
        if (environment['disableFirebaseUserActivityLog']) { return; } // development only
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
            dt = d.getFullYear().toString().substr(2, 2) + '-' + this.add0(d.getMonth() + 1) + '-' + this.add0(d.getDate());
        }
        return dt;
    }
    veryShortDate(stamp) {
        return this.shortDate(stamp).substr(3);
    }
    shortDateTime(stamp: any): string {
        const d = new Date(stamp * 1000);
        return d.getFullYear().toString().substr(2, 2) +
            '-' + this.add0(d.getMonth() + 1) +
            '-' + this.add0(d.getDate()) +
            ' ' + this.add0(d.getHours()) +
            ':' + this.add0(d.getMinutes());
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

    /**
     * Updates user's point from the server.
     */
    updateUserPoint() {
        if (this.user.isLogin) {
            this.loadMyPoint(p => {
                this.userPoint = p;
            });
        }
    }
    getUserTimezone() {

        const info = this.get(KEY_LMS_INFO);
        if (!info || !info['user']) {
            return;
        }
        // console.log(info);
        const user = info['user'];
        // console.log(`updateUserTimezone: `, user);

        if (user && user['timezone']) {
            return user['timezone'];
        } else {
            return 0;
        }
    }
    updateUserTimezone() {
        const info = this.get(KEY_LMS_INFO);
        if (!info || !info['user']) {
            return;
        }
        // console.log(info);
        const user = info['user'];
        // console.log(`updateUserTimezone: `, user);

        if (user && user['timezone']) {
        } else {
            return;
        }

        // this.time = this.a.lms.localeString(this.re['student']['timezone']);
        const date = this.lms.userDate(user['timezone']);
        let hour = date.getHours();
        let ap = '';

        if (hour < 12) {
            ap = 'am';
        } else {
            ap = 'pm';
        }
        if (hour !== 12) {
            hour = hour % 12;
        }


        const min = this.add0(date.getMinutes());


        // if (this.isKorean) {
        //     if (ap == 'am') ap = '오전';
        //     else ap = '오후';

        //     this.userTime = user['timezone_country'] + ' '
        //         + ap + ' '
        //         + hour + '시 ' + min + '분';
        // }
        // else {
        //     this.userTime = user['timezone_country'] + ' '
        //         + hour + ':' + min + ' ' + ap;
        // }

        this.userTime = this.t('CURRENT_TIME', { ap: ap, hour: hour, minute: min, country: user['timezone_country'] });
        // console.log(this.userTime);
    }


    userProfilePhoto(files) {
        if (files.length) {
            if (files[0]['url_portrait']) {
                return files[0]['url_portrait'];
            } else {
                return files[0]['url'];
            }
        } else {
            return this.anonymousPhotoURL;
        }
    }

    checkPhotoURL(url) {
        if (url) {
            return url;
        } else {
            return this.anonymousPhotoURL;
        }
    }

    /**
     * Returns number from a string.
     * @param n number
     *
     *
     */
    toInt(n: any) {
        try {
            return parseInt(n, 10);
        } catch (e) {
            return 0;
        }
        // if (typeof n == 'string') {
        //     return parseInt(n);
        // }
        // else if (typeof n == 'number') {
        //     return n;
        // }
        // else {
        //     return 0;
        // }
    }

    toFloat(n) {
        try {
            return parseFloat(n);
        } catch (e) {
            return 0;
        }
    }

    lmsInfoBook() {
        this.info = this.get(KEY_LMS_INFO);
        if (this.info && this.info['user'] && this.info['user']['book_next']) {
            return this.info['user']['book_next'];
        } else {
            return '';
        }
    }


    /**
     * Returns Unix timestamp.
     * @param d Date
     */
    getStamp(d: Date): number {
        return Math.round(d.getTime() / 1000);
    }
    /**
     * Return 'YmdHis' time format of the input parameter.
     * @param d Date
     *  If 'd' is falsy, then it will use current time.
     */
    getYmdHi(d?: Date): string {
        if (!d) {
            d = new Date();
        }
        // console.log('minutes:', d.getMinutes());
        return d.getFullYear() +
            this.add0(d.getMonth() + 1) +
            this.add0(d.getDate()) +
            this.add0(d.getHours()) +
            this.add0(d.getMinutes());
    }
    /**
     * Returns 'YYYYMMDD' of user time.
     */
    getYmd() {
        return this.getYmdHi().substr(0, 8);
    }
    /**
     * Returns 'HHii' of user time.
     */
    getHi() {
        return this.getYmdHi().substr(8, 4);
    }

    /**
     * Returns UTC Date after converting from User Time's YmdHis
     * @param YmdHi YmdHi
     */
    getUTCYmdHisFromUserYmdHi(YmdHi: string): string {
        if (!YmdHi) {
            return '';
        }
        console.log('YmdHis: ', YmdHi);
        const Y = parseInt(YmdHi.substr(0, 4), 10);
        const m = parseInt(YmdHi.substr(4, 2), 10) - 1;
        const d = parseInt(YmdHi.substr(6, 2), 10);
        const H = parseInt(YmdHi.substr(8, 2), 10);
        const i = parseInt(YmdHi.substr(10, 2), 10);

        console.log(Y, m, d, H, i);
        const date = new Date(Y, m, d, H, i);
        // console.log('ymdhis local: ', date);
        const userStamp = this.getStamp(date);
        const utcStamp = userStamp - this.getUserTimezone() * 60 * 60;
        console.log('userStamp:', userStamp, 'utcStamp', utcStamp);
        return this.getYmdHi(new Date(utcStamp * 1000));
    }
    getUserYmdHiFromUTCYmdHi(YmdHi: string): string {
        if (!YmdHi) {
            return '';
        }

        const Y = parseInt(YmdHi.substr(0, 4), 10);
        const m = parseInt(YmdHi.substr(4, 2), 10) - 1;
        const d = parseInt(YmdHi.substr(6, 2), 10);
        const H = parseInt(YmdHi.substr(8, 2), 10);
        const i = parseInt(YmdHi.substr(10, 2), 10);

        const date = new Date(Y, m, d, H, i);
        const utcStamp = this.getStamp(date);
        const userStamp = utcStamp + this.getUserTimezone() * 60 * 60;
        return this.getYmdHi(new Date(userStamp * 1000));
    }
    /**
     * Returns UTC Ymd from User Time's YmdHi
     * @param YmdHi User Time's YmdHis
     */
    getUTCYmd(YmdHi: string): string {
        const re = this.getUTCYmdHisFromUserYmdHi(YmdHi);
        if (re) {
            return re.substr(0, 8);
        }
        return '';
    }
    /**
     * Returns UTC Hi from User Time's YmdHi
     * @param YmdHi User Time's YmdHis
     */
    getUTCHi(YmdHi: string): string {
        const re = this.getUTCYmdHisFromUserYmdHi(YmdHi);
        if (re) {
            return re.substr(8, 4);
        }
        return '';
    }
    getStampOfToday(): number {
        const d = new Date();
        const n = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        return Math.round(n.getTime() / 1000);
    }

    // getDateOfTimezone(d: Date, tz: number) {
    //     const stamp = Math.round(d.getMilliseconds() / 1000);
    //     const newStamp = stamp - tz * 60 * 60;
    // }

    // getUTCDateFromLocalDate() {
    //     const d = new Date();
    //     return this.getUTCDateFromYmdHi(
    //         d.getFullYear() +
    //         this.add0( d.getMonth() + 1 ) +
    //         this.add0( d.getDate() ) +
    //         this.add0( d.getHours() ) +
    //         this.add0( d.getMinutes() )
    //     );
    // }

    /**
     * Converts UTC+0 Date and class begin, class end to user time.
     * @param session session passed by reference.
     */
    convertSessionIntoUserTime(session) {
        const b = this.getUserYmdHiFromUTCYmdHi(session.date + session.class_begin);
        session.date = b.substr(0, 8);
        session.class_begin = b.substr(8, 4);

        const e = this.getUserYmdHiFromUTCYmdHi(session.date + session.class_end);
        session.class_end = e.substr(8, 4);
    }
}
