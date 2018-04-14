import {Injectable, NgZone} from '@angular/core';
import {LanguageService} from './language.service';
import {Router} from '@angular/router';
import {Base, FireService} from '../modules/firelibrary/core';
import {XapiService, XapiUserService, XapiFileService, XapiLMSService} from '../modules/xapi/xapi.module';



/**
 * Firebase initialization.
 */
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import env from '../../environment';
import { SCHEDULE_TABLE } from '../modules/xapi/interfaces';
firebase.initializeApp(env['firebaseConfig']);


export const SITE_KATALKENGLISH = 'katalkenglish';
export const SITE_ONTUE = 'ontue';
export const SITE_WITHCENTER = 'withcenter';

export interface SITE {
    ontue: boolean;
    withcenter: boolean;
    katalkenglish: boolean;
}

const KEY_LMS_INFO = 'lms-info';
const firestoreLogCollection = 'user-activity-log-2';

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
     */
    _firebase: {
        db: firebase.firestore.Firestore;
        messaging: firebase.messaging.Messaging;
    } = { db: null, messaging: null };

    /**
     * Activity Log of All Site
     */
    activity_log = [];

    constructor(public ngZone: NgZone,
                public router: Router,
                public fire: FireService,
                public language: LanguageService,
                public xapi: XapiService,
                public user: XapiUserService,
                public file: XapiFileService,
                public lms: XapiLMSService) {
        // console.log(`AppService::constructor()`);
        // this.setColor('white');


        Base.collectionDomain = 'database';
        this.site[this.getSite()] = true;

        console.log('urlBackend: ', env['urlBackend']);
        xapi.setServerUrl(env['urlBackend']);

        this._firebase.db = firebase.firestore();
        this._firebase.messaging = firebase.messaging();
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
        setTimeout(() => this.ngZone.run(() => {
        }), timeout);
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
        if (!n) {
            return;
        }
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

    countStar(grade) {
        grade = parseInt(grade);
        if (grade >= 5) grade = 5;
        let re = Array(grade).fill(true);
        return re;
    }


    /**
     * Get schedule table(s)
     * @param options Pass options
     *  options['teachers'] = [ 123, 456, 789 ]; /// to show three teacher's schedule table.
     * @param callback callback
     */
    loadSchedule(options = {}, callback: (re: SCHEDULE_TABLE) => void ) {


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

    /**
     * Get the value of the key from localStorage
     * @param key key of localStorage
     * @return it can be an object or a scalar.
     */
    get(key: string): any {
        return this.xapi.get(key);
    }

    /**
     * Saves value into localStorage
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
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'login'});
        // console.log("userLogin::Log::");
    }

    /**
     * This method is being called when a user opens 'register' page.
     */
    onUserRegisterPage() {
        this.updatePushToken();
        this.log({activity: 'open-register'});
    }

    onUserRegister() {
        this.updateLMSInfo();
        this.updatePushToken();
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'register'});
    }

    onUserProfileUpdate() {
        this.updateLMSInfo();
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'update-profile'});
    }


    onLmsReserve(teacher_name) {
        if (!teacher_name) {
            return;
        }
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'reserve', target: teacher_name});
    }

    /**
     * Student and teacher can cancel a class. If a student cancells a class on schedule table, teacher name will have teacher name.
     * If a sesison is cancelled on session reservation list, then there will be no name on teacher name variable.
     * @param teacher_name teacher name of the session
     */
    onLmsCancel(teacher_name = '') {
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'cancel', target: teacher_name});
    }

    onUserViewProfile(teacher_name) {
        if (!teacher_name) {
            return;
        }
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'view-profile', target: teacher_name});
    }

    onBeginPayment() {
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'payment'});
    }

    onTeacherEvaluateSession(student_name = '') {
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'evaluate', target: student_name});
    }

    onStudentCommentToTeacher(teacher_name = '') {
        this.log({idx_user: this.user.id, name: this.user.name, activity: 'comment', target: teacher_name});
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


}
