import { Injectable, NgZone } from '@angular/core';
import { LanguageService } from './language.service';
import { Router } from '@angular/router';
import { Base, FireService } from '../modules/firelibrary/core';
import { XapiService, XapiUserService, XapiFileService, XapiLMSService } from '../modules/xapi/xapi.module';

import env from './../../environment';


export const SITE_KATALKENGLISH = 'katalkenglish';
export const SITE_ONTUE = 'ontue';
export const SITE_WITHCENTER = 'withcenter';

export interface SITE {
    ontue: boolean;
    withcenter: boolean;
    katalkenglish: boolean;
}



@Injectable()
export class AppService {
    color: string = null;

    /**
     * It prepares site code on booting. So, it won't be computed again on run time.
     * Use this whenever you need to determin if the user is using Stduent site or Teacher site
     *      and inside template whenever you need site code.
     *
     * This will not recompute anything and it's good to use in template.
     * @code
     *      <section id="ontue" *ngIf=" a.site.ontue ">
     */
    site: SITE = {
        ontue: false,
        katalkenglish: false,
        withcenter: false
    };

    /**
     * User's default photo
     */
    anonymousPhotoURL = 'assets/img/anonymous.png';

    constructor(
        public ngZone: NgZone,
        public router: Router,
        public fire: FireService,
        public language: LanguageService,
        public xapi: XapiService,
        public user: XapiUserService,
        public file: XapiFileService,
        public lms: XapiLMSService,
    ) {
        // console.log(`AppService::constructor()`);
        // this.setColor('white');


        Base.collectionDomain = 'database';
        this.site[this.getSite()] = true;

        console.log('urlBackend: ', env['urlBackend']);
        xapi.setServerUrl(env['urlBackend']);

        // this.language.setUserLanguage();
    }
    get isLogin() {
        return this.user.isLogin;
    }
    get isLogout() {
        return this.user.isLogout;
    }

    setColor(color) {
        this.color = color;
        console.log(`Color has been set to ${this.color}`);
    }
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
        setTimeout(() => this.ngZone.run(() => { }), timeout);
    }
    render(t?) {
        this.rerender(t);
    }


    open(url: string) {
        this.router.navigateByUrl(url);
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


    toast(msg) {
        if (msg.message) {
            alert(msg.message);
        } else {
            alert(msg);
        }
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


    add0(n: number): string {
        if (!n) { return; }
        return n < 10 ? '0' + n : n.toString();
    }

    shortName(name: string) {
        return name.slice(0, 8);
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
     * Get schedule table(s)
     * @param options Pass options
     *  options['teachers'] = [ 123, 456, 789 ]; /// to show three teacher's schedule table.
     * @param callback callback
     */
    loadSchedule(options = {}, callback?) {


        const defaults = {
            teachers: [],
            days: 15,
            min_duration: 0,
            max_duration: 160,
            navigate: 'today',
            starting_day: '',
            display_weekends: 'Y',
            min_point: 0,
            max_point: 100000,
            class_begin_hour: 0,        // Loads schedule btween 00:00 am and 23:59 pm.
            class_end_hour: 24          // Loads schedule btween 00:00 am and 23:59 pm.
        };

        options = Object.assign({}, defaults, options);


        this.lms.schedule_table_v4(options).subscribe(re => {
            if (!re) { // something is wrong.
                callback(re);
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

            // console.log('new: ', re);
            callback(re);
        });

        // this.lms.schedule_table(options).subscribe(re => {
        //     console.log('old: ', re);
        //     callback(re);
        // });
    }

}
