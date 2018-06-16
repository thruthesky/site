import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../../../providers/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SCHEDULE_EDIT} from '../../../../modules/xapi/lms.service';

@Component({
    selector: 'ontue-schedule-edit-page',
    templateUrl: 'ontue-schedule-edit.page.html',
    styleUrls: ['ontue-schedule-edit.page.scss']
})
export class OntueScheduleEditPage implements OnInit, OnDestroy {

    timezone_offset = 0;
    timezone_name = 0;
    time = '';
    timer = null;
    data: SCHEDULE_EDIT = <SCHEDULE_EDIT>{};
    allDays = false;
    params;


    php_to_kwr;
    usd_to_kwr;
    share_teacher;
    transaction_fee;
    buyer_rate;
    max_point_per_minute;


    payment_method = 'paypal';

    showLoader = false;

    constructor(public a: AppService,
                private route: ActivatedRoute,
                public router: Router
    ) {

        this.route.queryParams.subscribe(params => {
            // console.log('queryParams::', params);
            // console.log('my_schedule_info::', this.a.my_schedule_info);

            this.params = params;
            if (this.params.idx) {
                // GET DATA FROM SERVER
                this.a.lms.my_schedules_by_idx(this.params.idx).subscribe( re => {
                    // console.log('my_schedules_by_idx', re);
                    const s = re.schedules[0];
                    this.data = {
                        idx: s.idx,
                        point: s.point,
                        prere: s.prere,
                        class_begin_hour: s.user_time_class_begin.substr(0, 2),
                        class_begin_minute: s.user_time_class_begin.substr(2, 2),
                        duration: s.duration,
                        sunday: s.user_time_days.sunday,
                        monday: s.user_time_days.monday,
                        tuesday: s.user_time_days.tuesday,
                        wednesday: s.user_time_days.wednesday,
                        thursday: s.user_time_days.thursday,
                        friday: s.user_time_days.friday,
                        saturday: s.user_time_days.saturday
                    };
                }, e => {
                    this.a.toast(e);
                });
            }
            this.a.lms.my_schedule_info().subscribe(re => {
                // console.log('my_schedule_info', re);
                this.php_to_kwr = re['php_to_kwr'];
                this.usd_to_kwr = re['usd_to_kwr'];
                this.share_teacher = re['share_teacher'];
                this.transaction_fee = re['transaction_fee'];
                this.buyer_rate = re['buyer_rate'];
                this.max_point_per_minute = re['max_point_per_minute'];
            }, e => this.a.toast(e));
        });


        // console.log('params', this.params['schedule']);
        this.updateTime();
    }

    updateTime() {
        if (this.timezone_name) {
            // console.log('this. timezone ', this.timezone_offset)
            this.time = this.a.lms.localeString(this.timezone_offset);
            // console.log( this.time );
        }
        this.timer = setTimeout(() => this.updateTime(), 1000);
    }

    ngOnInit() {
        this.a.lms.timezone().subscribe(re => {
            // console.log(re);
            this.timezone_name = re['name'];
            this.timezone_offset = parseInt(re['offset'], 10);
        }, () => {
        });
    }

    ngOnDestroy() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    dismiss() {
        this.router.navigateByUrl('/my-schedule');
    }


    checkEmptySchedule() {
        const s = this.data;
        if (!s.sunday && !s.monday && !s.tuesday && !s.wednesday && !s.thursday && !s.friday && !s.saturday) {
            return true;
        }
        return false;
    }

    onSubmit() {
        // return console.log('data::', this.data);

        if (this.checkEmptySchedule()) {
            this.a.toast('Warning: Select Days! You need to select days to add/edit a schedule.');
            return;
        }
        this.showLoader = true;
        this.a.lms.schedule_edit(this.data).subscribe(re => {
            // console.log('re: ', re);
            this.showLoader = false;
            if (re['schedule']['idx']) {
                if (this.data.idx) {
                    this.a.toast('Update Success Schedule was update successful.');
                } else {
                    this.a.toast('Create Success New Schedule was created.');
                }
                this.router.navigateByUrl('/my-schedule');
            }
        }, e => {
            this.a.toast(e);
            this.showLoader = false;
        });
    }

    onClickAllDays() {
        if (!this.allDays) {
            this.data['sunday'] = true;
            this.data['monday'] = true;
            this.data['tuesday'] = true;
            this.data['wednesday'] = true;
            this.data['thursday'] = true;
            this.data['friday'] = true;
            this.data['saturday'] = true;
        } else {
            this.data['sunday'] = false;
            this.data['monday'] = false;
            this.data['tuesday'] = false;
            this.data['wednesday'] = false;
            this.data['thursday'] = false;
            this.data['friday'] = false;
            this.data['saturday'] = false;
        }
    }


    calculateEarning() {
        const c = this.countSelectedDays();
        let point = this.data.point * c * 4; // 20 days.
        if (!point) {
            return 0;
        }
        point = Math.ceil(point);
        const php = parseFloat(this.php_to_kwr);
        const usd = parseFloat(this.usd_to_kwr);
        if (!php) {
            return 0;
        }
        // console.log("php: ", this.payment_method);
        if (this.payment_method === 'western-union') {
            let p = Math.round(point / php * this.share_teacher / 100);
            p = Math.round(p - ( p * this.transaction_fee / 100));
            return p + ' pesos';
        }
        if (this.payment_method === 'paypal') {
            let u = Math.round(point / usd * this.share_teacher / 100);
            u = Math.round(u - ( u * this.transaction_fee / 100));
            return '$' + u;
        }
    }

    countSelectedDays() {

        let c = 0;
        if (this.data['sunday']) {
            c++;
        }
        if (this.data['monday']) {
            c++;
        }
        if (this.data['tuesday']) {
            c++;
        }
        if (this.data['wednesday']) {
            c++;
        }
        if (this.data['thursday']) {
            c++;
        }
        if (this.data['friday']) {
            c++;
        }
        if (this.data['saturday']) {
            c++;
        }

        return c;

    }


    maxPoint() {
        if (!this.data['point']) {
            return 0;
        }
        if (!this.data['duration']) {
            return 0;
        }
        return this.data['point'] > this.data['duration'] * this.max_point_per_minute;
    }
}

