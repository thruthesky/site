import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-instance-schedule-page',
    templateUrl: 'katalkenglish-instance-schedule.page.html',
    styleUrls: ['katalkenglish-instance-schedule.page.scss']
})
export class KatalkEnglishInstanceSchedulePage {
    re = null;
    pageInLoading = true;
    loading = {};
    constructor(
        public a: AppService
    ) {

        if ( this.a.isLogout ) {
            this.a.open('login');
            this.a.toast( this.a.t('YOU ARE NOT LOGGED IN'));
            return;
        }

        a.lms.schedule_available().subscribe(re => {
            this.pageInLoading = false;
            this.re = re;
            // console.log("schedule_available(): ", re);
        }, e => a.toast(e));
    }

    onClickSchedule(schedule) {
        if ( this.a.user.isLogout ) {
            return this.a.toast( this.a.t('LOGIN_FIRST')) ;
        }
        this.loading[schedule.idx] = true;
        this.a.lms.session_reserve({ idx_schedule: schedule.idx, date: schedule.date }).subscribe(re => {
            this.loading[schedule.idx] = false;
            const ss = this.re.available_schedules;
            this.re.available_schedules = ss.filter(i => i['idx'] !== schedule.idx);
            this.a.toast( this.a.t('INSTANCE_CLASS_RESERVED') );
            this.a.open('session-future');
            // this.a.okDialog('즉시 수업', '<div class="my-3">지금 곧 시작하는 수업을 예약 하였습니다.</div>수업 예약 페이지로 이동을 합니다.', () => this.a.open('session-future'));
            // console.log(re);
        }, e => {
            this.loading[schedule.idx] = false;
            this.a.toast(e);
        });
    }

    class_begin(schedule) {
        const begin = schedule.user_time_class_begin;
        const h = begin.substr(0, 2);
        const m = begin.substr(2, 2);
        return h + ':' + m;
    }
}
