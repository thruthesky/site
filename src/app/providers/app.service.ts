import { Injectable, NgZone } from '@angular/core';
import { LanguageService } from './language.service';
import { Router, NavigationExtras, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
// import { Base, FireService } from '../modules/firelibrary/core';
import { XapiService, XapiUserService, XapiFileService, XapiLMSService } from '../modules/xapi/xapi.module';

import { CODE_USER_NOT_FOUND_BY_THAT_EMAIL, CODE_WRONG_SESSION_ID, CODE_NO_USER_BY_THAT_SESSION_ID, CODE_LOGIN_FIRST } from '../modules/xapi/error';


/**
 * Firebase initialization.
 */
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';
firebase.initializeApp(environment['firebaseConfig']);

import { environment } from '../../environments/environment';
import { SCHEDULE_TABLE, LMS_INFO } from '../modules/xapi/interfaces';

/**
 * Material SnackBar is included in AppService since it is being used everywhere.
 * It should be used in even app.component or home component page of each site.
 */
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * If the domain contains `katalkenglish`, then it is considered as katalkenglish.com website
 *  except the domain does not contain `withcenter`. like `withcenterxxxx.katalkenglish.com` will be withcenter site.
 */
export const SITE_KATALKENGLISH = 'katalkenglish';
export const SITE_ONTUE = 'ontue';
/**
 * If the domain contains `withcenter`, then it is considered as withcenter.com website.
 */
export const SITE_WITHCENTER = 'withcenter';
export const SITE_ADMIN = 'admin';


export const KEY_SCHEDULES = 'key-schedules';
const SCHEDULE_CACHE_INTERVAL = 600; // 600 for 10 minutes. 1 for 1 second. 1800 for 30 min. 3600 for 1 hour.


export const KEY_WEEKEND = 'key-weekend';
export const KEY_DAYS = 'key-days';
export const KEY_TEACHER_LIST = 'key-teacher-list';
export const KEY_LMS_INFO = 'lms-info';



export interface SITE {
    ontue: boolean;
    withcenter: boolean;
    katalkenglish: boolean;
    englishas: boolean;
    admin: boolean;
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


interface Environment {
    production: boolean;
    hmr: boolean;
    urlBackend: string;
    firebaseConfig: any;
    reloadTag?: any;
    disableFirebaseUserActivityLog: boolean;
    categories: {
        teacher_reminders: number;
        student_reminders: number;
        policy: number;
        termsandconditions: number;
        topearner: number;
    };
    sslPort: string;
}



const firestoreLogCollection = 'user-activity-log';

@Injectable()
export class AppService {

    environment: Environment = environment;

    // color: string = null;

    // ln;



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
        englishas: false,
        withcenter: false,
        admin: false
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
    info: LMS_INFO = null;

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
    firebase: {
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
    userPoint = 0;


    NO_SCHEDULE_PER_PAGE = 50;


    /**
     * No of days to show on past session in session-list
     */
    DEFAULT_DAYS_TO_SHOW_ON_PAST_PAGE = 90; // 90 days.

    kakaoUrls = {
        student_kakaoplus_url: 'http://pf.kakao.com/_eIxgAC/chat', // 'http://pf.kakao.com/_eIxgAC',
        student_kakaoplus_deeplink: 'http://pf.kakao.com/_eIxgAC/chat', // 'kakaoplus://plusfriend/home/@katalkenglish',
        teacher_kakaoplus_url: 'http://pf.kakao.com/_RcxbRC',
        teacher_kakaoplus_deeplink: 'kakaoplus://plusfriend/home/@ontue'
    };

    constructor(
        public ngZone: NgZone,
        public router: Router,
        public activated: ActivatedRoute,
        public domSanitizer: DomSanitizer,
        public snackBar: MatSnackBar,
        public readonly language: LanguageService,
        public readonly xapi: XapiService,
        public readonly user: XapiUserService,
        public readonly file: XapiFileService,
        public readonly lms: XapiLMSService) {

        // Base.collectionDomain = 'database';
        this.site[this.getSite()] = true;


        // console.log(`AppService::constructor()`);
        // this.setColor('white');

        /**
         * Set's user default language If the user has not selected a language.
         */
        let languageCode = language.getUserSelectedLanguage();
        if (!languageCode) {
            // console.log('You did not choose a  language yet.');
            if (this.studentTheme) {
                // console.log('You are using student theme, So we set Korean');
                languageCode = 'ko';
            } else {
                // console.log('You are using teacher theme. So web set English');
                languageCode = 'english';
            }
        }
        // console.log('user language: ', languageCode);
        language.setUserLanguage(languageCode);

        this.language.load.subscribe(ln => {
            // console.log('language load ln: ', ln);
            this.languageLoaded(ln);
        });
        this.language.change.subscribe(ln => {
            // console.log('user change language into: ', ln);
            this.languageChanged(ln);
        });


        this.urlBackend = environment['urlBackend'];
        // console.log('urlBackend: ', this.urlBackend);
        xapi.setServerUrl(this.urlBackend);


        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationStart) {
                if (this.router.url === e.url) {
                    // console.log('same url');
                    this.router.navigate(['/redirect'], { queryParams: { url: e.url } });
                }
            } else if (e instanceof NavigationEnd) {
                this.routeUrl = this.router.url;
            }

            /**
             * Scroll the page to the top after transitioning into another page.
             */
            if (e instanceof NavigationEnd) {
                this.scrollToTop();
            }
        });

        // Just in case the app may need sometime to init.
        // Try to connect to the server first before it display the first page.
        this.info = this.get(KEY_LMS_INFO);
        setTimeout(() => {
            // console.log("going to call this.updateLMSInfo()");
            this.updateLMSInfo();
            if (this.user.isLogin) {
                this.log({ idx_user: this.user.id, name: this.user.name, activity: 'visit' });
            }
        }, 500);


        this.firebase.db = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true }; // 2018-05-07 backward compatibilities for firebase firestore new version.
        this.firebase.db.settings(settings);
        /**
         * IE does not support Push Notification API at all.
         * Latest Edge partly supports Push API. It supports Web Notification. But not Push notification.
         * We simply block all IE and Edge for Push.
         */
        if (this.isPushNotificationSupported()) {
            try {
                this.firebase.messaging = firebase.messaging();
            } catch (e) {
                // console.log('Handling push error', e);
            }
        }

        // this.language.setUserLanguage();

        setTimeout(() => {
            this.updateUserPoint();
        }, 1000);
        /**
         * Update user time
         */
        // this.updateUserTimezone(); // No need to do this. updateUserTimezone() will be fired right after language file is loaded.
        setInterval(() => {
            this.updateUserTimezone();
        }, 10000);

        // fire.user.loginAnonymously();


        this.listenActivityLog();

        //
        this.adminLoginUser();
    }

    get ln(): any {
        return LanguageService.ln;
    }

    /**
     * Short for `fire.t()`
     * @param code code
     * @param info info
     */
    t(code, info?) {
        return this.language.t(code, info);
    }


    get isLogin() {
        return this.user.isLogin;
    }

    /**
     * If there is 'login_session_id' in HTTP parameter, then it logs into that account.
     */
    adminLoginUser() {
        this.activated.queryParamMap.subscribe(params => {
            if (params.get('login_session_id')) {
                this.user.loadProfile(params.get('login_session_id')).subscribe(re => {
                    // console.log('user logged in as email: ', this.user.email);
                }, e => this.toast(e));
            }
        });
    }

    /**
     * Returns a url to login as student.
     *
     * Use this to the combination of adminUserLogin
     *
     * @param user User info from backend using 'admin_query'
     */
    userLoginUrl(user) {
        // console.log('user: ', user);
        if (!user.domain) {
            if (user.type === 'T') {
                user.domain = 'www.ontue.com';
            } else {
                user.domain = 'www.katalkenglish.com';
            }
        }
        // user.domain = 'localhost:4200';
        return `http://${user.domain}/menu?login_session_id=${user.session_id}`;
    }


    get isLogout() {
        return this.user.isLogout;
    }

    /**
     * If the student has less than or equal to 2 sessions,
     * then we consider the student is new to our site.
     */
    get isNewUser(): boolean {
        return this.lmsInfoUserNoOfTotalSessions <= 2;
    }

    // setColor(color) {
    //     // this.color = color;
    //     // console.log(`Color has been set to ${this.color}`);
    // }

    /**
     * Returns a domain of the site including sub-domain
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hostname
     *
     * @return string
     *      abc.com
     *      www.abc.com
     *      subdomain.rootdomain.com
     */
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
    // getFirebaseLoginEmail(ID): string {
    //     return 'user' + ID + '@php-wordpress-backend-server.com';
    // }
    /**
     * It returns simple password.
     *
     * It does not care the security.
     * @see README ## Registration and ## Login
     *
     * @param ID User UID of backend
     */
    // getFirebaseLoginPassword(ID): string {
    //     return 'password-' + ID;
    // }


    private isKatalkenglishDomain() {
        return this.getDomain().indexOf(SITE_KATALKENGLISH) !== -1;
    }

    private isOntueDomain() {
        return this.getDomain().indexOf(SITE_ONTUE) !== -1;
    }

    private isWithcenterDomain() {
        return this.getDomain().indexOf(SITE_WITHCENTER) !== -1;
    }
    private isAdminPath() {
        if (document && document.location && document.location.pathname) {
            if (document.location.pathname.indexOf('/manager') !== -1) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns true if the theme that the user is using is student's theme.
     *
     * @description student's theme may have more than one site/domain.
     */
    get studentTheme() {
        if (this.teacherTheme) {
            return false;
        } else if (this.withcenterTheme) {
            return false;
        } else {
            return true;
        }
        // return this.site.katalkenglish;
    }

    get teacherTheme() {
        return this.site.ontue;
    }
    get withcenterTheme() {
        return this.site.withcenter;
    }


    /**
     * Returns site code.
     *
     * It determins which site you are in.
     */
    getSite(): string {
        if (this.isAdminPath()) {
            return SITE_ADMIN;
        } else if (this.isWithcenterDomain()) {
            return SITE_WITHCENTER;
        } else if (this.isKatalkenglishDomain()) {
            return SITE_KATALKENGLISH;
        } else if (this.isOntueDomain()) {
            return SITE_ONTUE;
        } else {
            return SITE_KATALKENGLISH;
        }
    }

    /**
     * Returns true if the user is accessing student's main site like `katalkenglish.com` or `www.katalkenglish.com`
     *  sub domains of katalkenglish.com or other domains returns false.
     *
     *  Aside katalkenglish, there might be another student domain like 'englishas.com'.
     *
     *  It only returns true if the user is accessing main office site.
     */
    get isStudentMainSite(): boolean {
        const d = this.getDomain();
        if (d.indexOf('katalkenglish') === 0 || d.indexOf('www.katalkenglish') === 0) {
            return true;
        } else {
            return false;
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


    /**
     * Admin page must be visited with reloading to run getSite() again.
     */
    openAdminPage(manager_domain?, session_id?) {
        if (!manager_domain) {
            if (this.user.manager) {
                if (this.user.manager === '*') {
                    manager_domain = document.location.hostname;
                } else {
                    manager_domain = this.user.manager;
                }
            }
            if (!manager_domain) {
                this.toast('매니저 도메인이 잘못되어 관리자 페이지를 열 수 없습니다.');
                return;
            }
        }
        let port = this.environment.sslPort;
        if (port) {
            port = ':' + port;
        }
        if (session_id) {
            session_id = `session_id=${session_id}`;
        } else {
            session_id = '';
        }
        const url = `//${manager_domain}${port}/manager?${session_id}`;
        // console.log(url);
        document.location.href = url;
    }

    openProfile() {
        this.open('/profile');
    }
    urlPost(ID) {
        return `/post/${ID}`;
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

            // console.log('error from server?', o);
            const code = this.xapi.getError(o).code;
            o = {
                message: this.xapi.getError(o).message,
                panelClass: 'error' + code
            };
            // console.log('o: ', o);

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
                // console.log('==> login session invalid. login again');
                o['message'] = this.t('LOGIN_INVALID'); // rewrite error message.
            } else if (code === CODE_USER_NOT_FOUND_BY_THAT_EMAIL) {
                o['message'] = this.t('CODE_USER_NOT_FOUND_BY_THAT_EMAIL');
            } else if (code === CODE_LOGIN_FIRST) {
                o['message'] = this.ln.LOGIN_FIRST;
            }

        } else if (o instanceof HttpErrorResponse) { // PHP ERROR. backend wordpress response error. status may be 200.
            // console.log('error of http: ', o);
            /**
             * @todo This error happens rarely. @see https://github.com/thruthesky/ontue/issues/192
             * @todo try to produce php error and display error log on console.
             * @todo Sometimes, somehow, the error disappears and cannot be reproduced.
             */
            if (o.status === 0) {
                o = { message: this.ln.NO_INTERNET };
            } else if (o.status === 200) {
                o = { message: this.ln.PHP_ERROR };
            } else {
                o = { message: o.message };
            }
        } else if (o.message === void 0) {
            o['message'] = 'No message';
        }
        const defaults = {
            duration: 8000,
            action: this.ln['CLOSE'],
            panelClass: 'toast'
        };
        o = Object.assign(defaults, o);
        // console.log('o:', o);
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
     * This let user log out from Wordpress PHP Backend and moves to a page.
     * @param home if set true, it move to home. by default it's false.
     */
    logout(home = false) {
        // console.log(`logout( home ) `, home);

        this.user.logout();
        if (home) {
            this.openHome();
        }
        // this.fire.user.logout().then(() => {
        // });
    }

    get isManager() {
        return !!this.user.manager;
    }

    get isSuperManager() {
        return this.isAdmin;
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
        // console.log('cacheKeySchedule:', key);
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
                // console.log(`Using cached schedule data. Cache Expiration Interval: ${SCHEDULE_CACHE_INTERVAL}. Time now(${timeNow}) - Time cached(${timeCache}) = ${passed} seconds has passed. and ${left} seconds left to re-cache.`);
                // console.log(`Using Cached schedule. ${left} seconds left for update.`);
                // return null;
                return re;
            } else {
                // console.log(`Cached data has expired. Cache interval: ${SCHEDULE_CACHE_INTERVAL} but, ${passed} has passed. timeCache: ${timeCache}, timeNow: ${timeNow}. Going to get new data.`);
                return null;
            }
        } else {
            // console.log('No cached data. Going to load all teacher schedules');
            return null;
        }
    }
    /**
     * Removing cached schedule table data only.
     */
    cacheDeleteSchedule() {
        const keys = Object.keys(localStorage);
        // console.log('cacheDeleteSchedule. Keys: ', keys);
        if (keys) {
            for (const key of keys) {
                if (key.indexOf(KEY_SCHEDULES) !== -1) {
                    // console.log('removing : ', key);
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

        // console.log('loadSchedule: options: ', options);
        /**
         * Use cached data for all schedule table.
         *
         */
        if (options.useCache) {
            const schedules = this.cacheGetSchedule(options);
            if (schedules) {
                // console.log('got cached schedule. length of table: ', schedules.table.length);
                callback(schedules);
                return;
            }
        } else {
            // if the user changes options on schedule tables search,
            // then, it should delete it's cache.
        }

        this.lms.schedule_table_v4(options).subscribe(re => {
            // console.log('schedule_table_v4() result:', re);
            if (!re) { // something is wrong.
                // console.error('Something went wrong with schedule_table_v4()');
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
    /**
     * It deletes all schedules.
     */
    // deleteScheduleCache() {
    //     this.set(KEY_SCHEDULES, null); /// new code. When a session is clicked. delete old schedule cache.
    // }

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
            this.info = <LMS_INFO>{};
        }
        this.lms.info(this.getDomain()).subscribe(re => {
            // console.log('lms.info: ', re);
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
    lmsInfoCancellableTimeForInstantReservation() {
        if (this.info && this.info['CANCELLABLE_TIME_FOR_INSTANT_RESERVATION']) {
            return parseInt(this.info['CANCELLABLE_TIME_FOR_INSTANT_RESERVATION'], 10) / 60;
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

    get lmsMaxFreeClass(): number {
        const info: LMS_INFO = <any>this.get(KEY_LMS_INFO);
        const no = info.MAX_FREE_CLASS;
        if (!no) {
            return 0;
        }
        return parseInt(no, 10);
    }

    get vat(): any {
        const info: LMS_INFO = <any>this.get(KEY_LMS_INFO);
        if (info === void 0 || !info) {
            return 0;
        }
        if (info.VAT === void 0 || !info.VAT) {
            return 0;
        }
        return this.floatval(info.VAT);
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
        if (!this.isPushNotificationSupported() || !this.firebase.messaging) {
            return;
        }

        // // console.log('initWebPushMessage', this.firebase);
        this.firebase.messaging.requestPermission()
            .then(() => { /// User accepted 'push notification alert'
                this.firebase.messaging.getToken()
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
        this.firebase.messaging.onTokenRefresh(() => {
            this.firebase.messaging.getToken()
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
        this.firebase.messaging.onMessage(payload => {
            // console.log("Message received. ", payload);
            // ...
            const notification = payload['notification'];
            // const title = notification['title'];
            const body = notification['body'];
            this.toast(body);
        });

    }


    /**
     * Gets push token string and update it to server only IF it's new.
     * @param token push token string
     */
    updatePushToken() {
        if (!this.isPushNotificationSupported()) {
            // console.log('return because it is ie or edge or safari.');
            return;
        }
        if (environment['disableFirebaseUserActivityLog']) { return; } // development only
        const platform = 'web';
        if (!this.pushToken) {
            // console.log('updatePushToken(): token is empty. It will not update. just return.');
            return;
        }
        this.lms.update_push_token(this.pushToken, platform).subscribe(re => {
            // console.log('Token updated:', re);
        }, e => console.error(e));
    }


    /**
     * This method is being invoked when the user is logged in.
     * This method is called from login.page.ts ( NOT from register )
     *
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
    // onUserRegisterPage() {
    //     this.updatePushToken();
    //     this.log({ activity: 'open-register' });
    // }

    /**
     * This method is being invoked only the user registers for the first time.
     * It is not invoked twice.
     */
    onUserRegister() {
        this.updateLMSInfo();
        this.updatePushToken();
        this.lms.updateLanguage(this.language.getUserLanguage()).subscribe(re => {
            // console.log('updateLanguage: ', re);
        });
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'register' });
    }

    /**
     * This method is being invoked every time user update his profile.
     */
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
        // console.log('onUserViewProfile', teacher_name);
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
        data['stamp'] = firebase.firestore.FieldValue.serverTimestamp();
        // console.log(data);
        const col = this.firebase.db.collection(firestoreLogCollection);
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
        const db = this.firebase.db;


        db.collection(firestoreLogCollection)
            .orderBy('stamp', 'desc')
            .limit(20)
            .get().then(s => {
                s.forEach(doc => {
                    const data = doc.data();
                    data['id'] = doc.id;
                    data['date'] = this.serverTime(data['stamp']);
                    this.activity_log.push(data);
                });
                // console.log('activity log', this.activity_log);
            }).catch(error => {
                // console.log('Error getting document:', error);
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
                        // this.activity_log.pop();
                    }
                });
            }, error => {
                // console.log('snap error::', error);
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
    loadMyPoint(callback, loaderTimeout = 0) {
        this.inLoadingMyPoint = true;
        this.lms.my_point().subscribe(re => {
            let point = re['point'];
            point = this.number_format(point);
            setTimeout(() => this.inLoadingMyPoint = false, loaderTimeout);
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


    onClickContactAdmin(event?: Event) {
        //
        if (event) {
            event.preventDefault();
        }

        if (this.isTeacher) {
            if (this.isMobile()) {
                window.open(this.kakaoUrls.teacher_kakaoplus_deeplink);
            } else {
                window.open(this.kakaoUrls.teacher_kakaoplus_url);
            }
        } else {
            if (this.isMobile()) {
                document.location.href = this.kakaoUrls.student_kakaoplus_deeplink;
            } else {
                // this.toast(this.ln.KATALK_OPEN_ON_MOBILE_ONLY);
                window.open(this.kakaoUrls.student_kakaoplus_url);
            }
        }



        return false;
    }


    /**
     * Display short date
     * @param stamp unix timestamp
     * @param full - true return full shorten date today
     *        full - false return time of today
     * @returns mixed - return may be date or time.
     */
    shortDate(stamp, full = false) {
        const d = new Date(stamp * 1000);
        const today = new Date();
        let dt;
        if (!full && d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
            dt = d.toLocaleString();
            dt = dt.substring(dt.indexOf(',') + 2).toLowerCase();
            dt = dt.replace(/\:\d\d /, ' ');
        } else {
            dt = d.getFullYear().toString().substr(2, 2) + '-' + this.add0(d.getMonth() + 1) + '-' + this.add0(d.getDate());
        }
        return dt;
    }
    veryShortDate(stamp) {
        return this.shortDate(stamp, true).substr(3);
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
    isIe() {
        return window['ie_version'] <= 11;
    }
    isEdge() {
        return window['ie_version'] >= 12;
    }
    /**
     * Returns true if the browser is Safari.
     */
    isSafari() {
        return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    }
    isPushNotificationSupported(): boolean {

        if ('Notification' in window) {
            // API supported
            return true;
        } else {
            // API not supported
            return false;
        }
    }
    /**
     * Returns true if the user is using browser on mobile/tablet.
     */
    isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }

    }
    warningIeEdge() {
        if (this.isIeEdge()) {
            setTimeout(() => {
                this.toast({
                    message: this.ln.IE_EDGE_WARNING,
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
     * Returns a string of 'small' or 'big' depending on the width of the app/web.
     */
    size(): 'small' | 'big' {
        return this.isMobileView() ? 'small' : 'big';
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

    /**
     * @desc this.userTime holds user current time based on his timezone settings.
     *      and it is must be translated with his local language.
     *      But when it is being called for the first time by constructor, the language json file not loaded yet.
     *      So, the text 'CURRENT TIME' is being display.
     *      To prevent this, this method must be invoked right after the language file is loaded.
     */
    updateUserTimezone() {
        const info = this.get(KEY_LMS_INFO);
        // console.log('updateUserTimezone: ', info);
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

        // console.log('user tz: ', user['timezone']);

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
        // console.log('userTime: ', this.userTime);
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
        // console.log('YmdHis: ', YmdHi);
        const Y = parseInt(YmdHi.substr(0, 4), 10);
        const m = parseInt(YmdHi.substr(4, 2), 10) - 1;
        const d = parseInt(YmdHi.substr(6, 2), 10);
        const H = parseInt(YmdHi.substr(8, 2), 10);
        const i = parseInt(YmdHi.substr(10, 2), 10);

        // console.log(Y, m, d, H, i);
        const date = new Date(Y, m, d, H, i);
        // console.log('ymdhis local: ', date);
        const userStamp = this.getStamp(date);
        const utcStamp = userStamp - this.getUserTimezone() * 60 * 60;
        // console.log('userStamp:', userStamp, 'utcStamp', utcStamp);
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


    /**
     * This method is being invokded right after user language file loaded.
     * You can do whatever you want to do here if it is related in language.
     *
     * @param ln Language JOSN object data.
     */
    languageLoaded(ln) {
        this.updateUserTimezone();
    }

    languageChanged(ln) {
        this.lms.updateLanguage(ln).subscribe(re => {
            // console.log('lms.languageChanged: re', re);
        });
    }


    /**
     * Scroll to the top.
     * @param timeout timeout ms
     * @example this.a.scrollToTop(50);
     */
    scrollToTop(timeout?) {
        if (timeout) {
            setTimeout(() => {
                window.document.body.scrollTop = window.document.documentElement.scrollTop = 0;
                // console.log('scroll, ', timeout);
            }, timeout);
        } else {
            window.document.body.scrollTop = window.document.documentElement.scrollTop = 0;
        }
    }

    /**
     * strip out HTML tags.
     * @param str string
     */
    stripTags(str) {
        return str.replace(/<\/?.+?>/ig, '');
    }

    safeHtml(html: string): any {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    get site_name(): string {
        // console.log('info.branch', this.info.branch);
        /**
         * Main branch has no branch information. No site_name.
         */
        // const d = this.getDomain();
        // if ( this.getDomain() === 'katalkenglish.com' || d === 'www.katalkenglishc.com' ) {
        //     return '카톡영어';
        // }
        if (this.info) {
            if (this.info.branch) {
                if (this.info.branch.site_name && this.info.branch.site_name !== 'undefined') {
                    return this.info.branch.site_name;
                }
            }
        }
        return '';
    }

    scrollIntoViewById(id: string) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        return true;
    }

    shortNumber(n: any) {
        if (typeof n === 'string') {
            n = parseInt(n, 10);
        }
        if (n < 1000) {
            return n;
        } else if (n < 1000000) {
            return (n / 1000).toPrecision(3) + 'K';
        } else if (n < 1000000000) {
            return (n / 1000000).toPrecision(3) + 'M';
        } else if (n < 1000000000000) {
            return (n / 1000000000).toPrecision(3) + 'B';
        }
    }
}
