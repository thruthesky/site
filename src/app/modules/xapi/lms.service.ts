import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { XapiService } from './xapi.service';
import { XapiUserService } from './user.service';


import { Base } from './base';
import { TEACHER_LIST_RESPONSE, LMS_INFO, Branch } from './interfaces';
export { Branch };

export interface SCHEDULE_EDIT extends DAYS {
    idx?: number;
    point: number;
    prere: string;
    class_begin_hour: number;
    class_begin_minute: number;
    duration: number;
}

export interface SCHEDULE extends DAYS {
    idx: number;
    idx_teacher: number;
    class_begin: number;
    class_end: number;
    original_class_begin: number;
    original_class_end: number;
    point: number;
    prere: string;
    stamp_created: number;
    user_time_days: {
        sunday: 'Y' | '',
        monday: 'Y' | '',
        tuesday: 'Y' | '',
        wednesday: 'Y' | '',
        thursday: 'Y' | '',
        friday: 'Y' | '',
        saturday: 'Y' | '',
    };
}


export type SCHEDULE_EDIT_RESPONSE = Array<SCHEDULE>;

export interface DAYS {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
}


export interface SESSION {
    book_next: string;
    book_used: string;
    class_begin: string;
    class_end: string;
    comment: string;
    date: any;
    expression: number;
    grammer: number;
    idx: number;
    idx_schedule: number;
    idx_teacher: number;
    idx_student: number;
    paid: number;
    point: number;
    pronunciation: number;
    refund_done_at: number;
    refund_done_by: number;
    refund_done_point: number;
    refund_reject_at: any;
    refund_reject_message: string;
    refund_request_at: any;
    refund_request_message: string;
    refund_settle_at: number;       // admin is the one who decide.
    refund_settle_message: string;  // admin leave a message
    speed: number;
    stamp_checked: number;
    stamp_reserved: number;
    successful: string;
    vocabulary: number;
    studentName?: string;
    teacherName?: string;
}

export interface PAYMENT_RATE {
    NEW_EXCHANGE_BUYER_RATE: string;
    NEW_EXCHANGE_SELLER_RATE: string;
    USD_TO_KRW: string;
    USD_TO_JPY: string;
    USD_TO_CNY: string;
    VAT: string;
}


export interface MYPAGE {
    ID: number;
    name: string;
    photoURL: string;
    point: number;
    timezone: string;
    timezone_country: string;
    book_next: string;
    class_software: string;
    class_software_id: string;
    no_of_total_sessions: number;
    no_of_reservation: number;
    no_of_past: number;
    next_class: {
        idx: number;
        date_display: number;
        class_begin_display: number;
        teacher_name: string;
        teacher_photoURL: string;
    };
    level: number;
    progress: Array<{
        date: number;
        level: number;
        teacher_name: string;
        comment: string;
    }>;
    greeting: string;
    auction: {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        hour: number;
        minute: number;
        duration: number;
        point: number;
        comment: string;
        hourTime_stamp?: number;
    };
}


@Injectable()
export class XapiLMSService extends Base {

    userType = {
        teacher: 'T',
        student: 'S'
    };

    constructor(private x: XapiService,
        private user: XapiUserService) {
        super();
    }


    /**
     * Returns 'student' or 'teacher'.
     */
    getUserType(): '' | 'student' | 'teacher' {
        const profile = this.user.getProfile();
        if (profile['user_type']) {
            if (profile['user_type'] === 'T') {
                return 'teacher';
            } else if (profile['user_type'] === 'S') {
                return 'student';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    setUserType(type) {
        const data = {
            session_id: this.user.sessionId,
            route: 'lms.set_user_type',
            type: type
        };
        return this.x.post(data);
    }

    schedule_edit(data: SCHEDULE_EDIT): Observable<SCHEDULE_EDIT_RESPONSE> {
        const defaults = {
            route: 'lms.schedule_edit',
            session_id: this.user.sessionId
        };
        data = Object.assign(defaults, data);
        return this.x.post(data);
    }

    schedule_delete(idx) {
        const data = {
            route: 'lms.schedule_delete',
            session_id: this.user.sessionId,
            idx: idx
        };
        return this.x.post(data);

    }


    /**
     * Returns the timezone offset based on user's browser.
     */
    getUserLocalTimezoneOffset() {
        const localTz = (new Date).getTimezoneOffset() / 60;
        let offset = Math.abs(Math.floor(localTz));
        if (localTz < 0) {
            offset = Math.abs(localTz);
        } else {
            offset = -1 * offset;
        }
        return offset;
    }


    timezone(): Observable<string> {
        const data = {
            route: 'lms.timezone_info',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }


    /**
     * Get all the timezones.
     */
    timezones(): Observable<any> {
        const data = {
            route: 'lms.timezones_info'
        };
        return this.x.post(data);
    }

    timezone_set(offset): Observable<any> {
        const data = {
            route: 'lms.timezone_set',
            session_id: this.user.sessionId,
            timezone: offset
        };
        return this.x.post(data);
    }


    /**
     * Returns user Date object.
     * @param offset timezone offset
     */
    userDate(offset) {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * offset));
    }

    /**
     * Returns a time of timezone offset.
     * @param offset timezone offset
     */
    localeString(offset) {
        // console.log('offset: ', offset);
        return this.userDate(offset).toLocaleString();
    }


    my_schedules(): Observable<any> {
        const data = {
            route: 'lms.my_schedule',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }

    /**
     * return lms info to use in schedule input validation
     * @returns {Observable<any>}
     */
    my_schedule_info(): Observable<any> {
        const data = {
            route: 'lms.my_schedule_info',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }


    /**
     *
     * @param idx
     * @returns mixed 1 schedule and
     */
    my_schedules_by_idx(idx): Observable<any> {
        const data = {
            idx: idx,
            route: 'lms.my_schedule',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }

    schedule_search(data) {
        data['route'] = 'lms.schedule_search';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    schedule_table(data) {
        data['route'] = 'lms.new_schedule_table';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }
    schedule_table_v4(data) {
        data['route'] = 'lms.schedule_table_v4';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    teacher_list(data): Observable<TEACHER_LIST_RESPONSE> {
        data['route'] = 'lms.teacher_list';
        data['domain'] = window.location.hostname;
        return <any>this.x.post(data);
    }


    session_reserve(data) {
        data['route'] = 'lms.session_reserve';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    session_cancel(idx_reservation) {
        const data = { idx_reservation: idx_reservation };
        data['route'] = 'lms.session_cancel';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    session_search(data) {

        data['route'] = 'lms.session_search';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    my_point() {
        const data = {};
        data['route'] = 'lms.my_point';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }
    point_add(data) {
        data['route'] = 'lms.point_add';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    get_dayoffs() {
        const data = {};
        data['route'] = 'lms.dayoff_get';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    set_dayoff(date) {
        const data = { route: 'lms.dayoff_set', session_id: this.user.sessionId, date: date };
        return this.x.post(data);
    }

    delete_dayoff(date) {
        const data = { route: 'lms.dayoff_delete', session_id: this.user.sessionId, date: date };
        return this.x.post(data);
    }


    message(data) {
        data['route'] = 'lms.message';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    message_opened(idx) {
        const data = {
            idx: idx,
            route: 'lms.message_opened',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }

    session_refund_request(data) {
        data['route'] = 'lms.session_refund_request';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    session_cancel_refund_request(idx) {
        const data = {};
        data['route'] = 'lms.session_cancel_refund_request';
        data['session_id'] = this.user.sessionId;
        data['idx_reservation'] = idx;
        return this.x.post(data);
    }

    session_refund(idx) {
        const data = {
            idx_reservation: idx,
            route: 'lms.session_refund',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }

    session_refund_reject(data) {
        data['route'] = 'lms.session_refund_reject';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    payment_information_update(data) {
        data['route'] = 'lms.payment_information_update';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    payment_information() {
        const data = {};
        data['route'] = 'lms.payment_information';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    payment_information_history() {
        const data = {};
        data['route'] = 'lms.payment_information_history';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    session_evaluate(data) {
        data['route'] = 'lms.session_evaluate';
        data['session_id'] = this.user.sessionId;
        // console.log(data);
        return this.x.post(data);
    }

    get_session_evaluation(idx) {
        const data = {};
        data['route'] = 'lms.get_session_evaluation';
        data['session_id'] = this.user.sessionId;
        data['idx'] = idx;
        return this.x.post(data);

    }


    /**
     * Gets a page
     * @param req request data
     *
     * @code
     * a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e.message));
     * @endcode
     */
    page(req): any {
        req['route'] = 'lms.page';
        // console.log(req);
        return this.x.post(req)
            .map(e => {
                const re = this.x.safe(e);
                this.x.render(500);
                return re;
            });
    }

    update_kakao_qrmark_string() {
        const data = {};
        data['route'] = 'lms.update_kakao_qrmark_string';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    get_payment_history() {
        const data = {};
        data['route'] = 'lms.get_payment_history';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }

    // /**
    //  * @deprecated
    //  */
    // stats() {
    //   return this.x.post({route: 'lms.stats'});
    // }

    schedule_available() {
        return this.x.post({
            route: 'lms.schedule_available',
            session_id: this.user.sessionId
        });
    }

    /**
     * @todo should be commented out? Is this method being used anywhere?
     */
    payment_rate(): Observable<PAYMENT_RATE> {
        return this.x.post({ route: 'lms.payment_rate' });
    }
    payment_bank_country_selection(req) {
        req['route'] = 'lms.payment_bank_country_selection';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }


    /**
     * Gets lms information.
     * @note this should be called once on every boot.
     */
    info(domain?): Observable<LMS_INFO> {
        const req = { route: 'lms.info', session_id: this.user.sessionId };
        if (domain) {
            req['domain'] = domain;
        }
        return this.x.post(req);
    }


    get_student_comments_to_teacher(req) {
        // console.log("get_student_comments_to_teacher", req);
        req['route'] = 'lms.get_student_comments_to_teacher';
        return this.x.post(req);
    }

    student_comment_to_teacher_by_idx(req) {
        req['route'] = 'lms.student_comment_to_teacher_by_idx';
        return this.x.post(req);
    }

    student_comment_to_teacher_edit(req) {
        req['route'] = 'lms.student_comment_to_teacher_edit';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }

    student_comment_to_teacher_delete(req) {
        req['route'] = 'lms.student_comment_to_teacher_delete';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }

    get_latest_student_comment_to_teachers(req) {
        req['route'] = 'lms.get_latest_student_comment_to_teachers';
        return this.x.post(req);
    }

    get_teacher_site_info() {
        return this.x.post({
            route: 'lms.get_teacher_site_info',
        });
    }

    update_push_token(token: string, platform: string) {
        const domain = window.location.hostname;
        return this.x.post({
            route: 'lms.update_push_token',
            session_id: this.user.sessionId,
            token: token,
            platform: platform,
            domain: domain
        });
    }

    get_teacher_evaluations_to_student(req) {
        req['route'] = 'lms.get_teacher_evaluations_to_student';
        return this.x.post(req);
    }

    session_stamp_checked(req) {
        req['route'] = 'lms.session_stamp_checked';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }

    get_my_level() {
        return this.x.post({
            session_id: this.user.sessionId,
            route: 'lms.my_level',
        });
    }

    get_sessions_in_refund_progress(req) {
        req['session_id'] = this.user.sessionId;
        req['route'] = 'lms.get_sessions_in_refund_progress';
        return this.x.post(req);
    }
    admin_accept_refund_request(req) {
        req['session_id'] = this.user.sessionId;
        req['route'] = 'lms.admin_accept_refund_request';
        return this.x.post(req);
    }
    admin_reject_refund_request(req) {
        req['session_id'] = this.user.sessionId;
        req['route'] = 'lms.admin_reject_refund_request';
        return this.x.post(req);
    }
    /**
     * Returns the data from WordPress LMS Backend.
     * @param req query.
     * @see Xapi lms.interface.php::admin_query for detail explanation.
     * @example
             this.a.lms.admin_query({ table: 'wp_users' })
            .subscribe(re => {
                // console.log('re: ', re);
            }, e => this.a.toast(e));
     */
    admin_query(req) {
        req['session_id'] = this.user.sessionId;
        req['route'] = 'lms.admin_query';
        return this.x.post(req);
    }
    admin_push_token_stat() {
        const req = {};
        req['route'] = 'lms.admin_push_token_stat';
        return this.x.post(req);
    }
    admin_push_send(req) {
        req['session_id'] = this.user.sessionId;
        req['route'] = 'lms.admin_push_send';
        return this.x.post(req);
    }

    get_teacher_info_by_idx(idx_teacher, full = false) {
        return this.x.post({
            idx_teacher: idx_teacher,
            full: full,
            route: 'lms.get_teacher_info_by_idx',
        });
    }
    //

    get_payment_computation_info() {
        return this.x.post({
            route: 'lms.get_payment_computation_info',
        });
    }

    get_session_refund_info(req) {
        req['route'] = 'lms.get_session_refund_info';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }

    admin_save_settings(req) {
        req['route'] = 'lms.admin_save_settings';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }
    admin_get_settings() {
        const req = {};
        req['route'] = 'lms.admin_get_settings';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }
    admin_session_get(idx) {
        const req = { idx: idx };
        req['route'] = 'lms.admin_session_get';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }
    admin_session_save(req) {
        req['route'] = 'lms.admin_session_save';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }
    updateLanguage(ln) {
        const req = { language: ln };
        req['route'] = 'lms.updateLanguage';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }
    teacher_country_get() {
        const req = {};
        req['route'] = 'lms.teacher_country_get';
        return this.x.post(req);
    }

    admin_user_profile_photo_update(req) {
        req['route'] = 'lms.admin_user_profile_photo_update';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }


    branch_register(req) {
        req['route'] = 'lms.branch_register';
        return this.x.post(req);
    }
    branch_get(): Observable<Branch> {
        return this.x.post({ route: 'lms.branch_get', session_id: this.user.sessionId });
    }
    branch_information(domain): Observable<Branch> {
        return this.x.post({ route: 'lms.branch_information', domain: domain });
    }
    /**
     * Update branch information.
     * @param req request data to update on branch information. It can be only one key and value to update only one field.
     * @example
                console.log('file uploaded: ', file);
                this.branch.logo_url = file.url;
                this.a.lms.branch_update({ logo_url: this.branch.logo_url }).subscribe( re => {
                    console.log('branch_update logo: re:', re);
                }, e => this.a.toast(e));
     */
    branch_update(req): Observable<Branch> {
        req['route'] = 'lms.branch_update';
        req['session_id'] = this.user.sessionId;
        return this.x.post(req);
    }
    branch_domain_change_application(domain: string): Observable<any> {
        return this.x.post({
            route: 'lms.branch_update',
            session_id: this.user.sessionId,
            domain_change_application: domain,
        });
    }
    branch_cancel_domain_change_application(idx?: number): Observable<any> {
        if (!idx) {
            idx = 0;
        }
        return this.x.post({
            route: 'lms.branch_update',
            session_id: this.user.sessionId,
            idx: idx,
            domain_change_application: ''
        });
    }
    branch_get_domain_change_applications(): Observable<Array<Branch>> {
        return this.x.post({
            route: 'lms.branch_get_domain_change_applications',
            session_id: this.user.sessionId
        });
    }

    branch_accept_domain_change_application(idx: number): Observable<any> {
        return this.x.post({
            route: 'lms.branch_accept_domain_change_application',
            session_id: this.user.sessionId,
            idx: idx
        });
    }
    point_log_actions_get() {
        return this.x.post({
            route: 'lms.point_log_actions_get'
        });
    }
    teacher_schedule_table_get(idx_teacher): Observable<any> {
        return this.x.post({
            route: 'lms.teacher_schedule_table_get',
            idx_teacher: idx_teacher
        });
    }

    admin_branch_record_get(): Observable<any> {
        return this.x.post({
            route: 'lms.admin_branch_record_get',
            session_id: this.user.sessionId
        });
    }
    admin_statistics(req): Observable<any> {
        req['route'] = 'lms.admin_statistics';
        return this.x.post(req);
    }

    admin_get_refund_request_count() {
        return this.x.post({
            route: 'lms.admin_get_refund_request_count',
            session_id: this.user.sessionId
        });
    }

    get_successful_reservation(idx_student: number) {
        return this.x.post({
            idx_student: idx_student,
            route: 'lms.get_successful_reservation',
            session_id: this.user.sessionId
        });
    }

    mypage(): Observable<MYPAGE> {
        return this.x.post({
            route: 'lms.mypage',
            session_id: this.user.sessionId
        });
    }

    greeting_update(greeting: string): Observable<any> {
        return this.x.post({
            route: 'lms.greeting_update',
            session_id: this.user.sessionId,
            greeting: greeting
        });
    }
    get_greetings(): Observable<any> {
        return this.x.post({
            route: 'lms.get_greetings'
        });
    }



    auction_update(auction): Observable<any> {
        return this.x.post({
            route: 'lms.auction_update',
            session_id: this.user.sessionId,
            auction: auction
        });
    }
    get_auctions(): Observable<any> {
        return this.x.post({
            route: 'lms.get_auctions'
        });
    }
    auction_delete(): Observable<any> {
        return this.x.post({
            route: 'lms.auction_delete',
            session_id: this.user.sessionId
        });
    }

    get_latest_student_register(req) {
        req['route'] = 'lms.get_latest_student_register';
        return this.x.post(req);
    }



}
