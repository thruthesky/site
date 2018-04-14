
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SCHEDULE_TABLE, N } from '../../modules/xapi/interfaces';

@Component({
    selector: 'schedule-table-page',
    templateUrl: 'schedule-table.page.html',
    styleUrls: ['schedule-table.page.scss'],
})
export class ScheduleTablePage implements OnInit {

    N = N;
    re: SCHEDULE_TABLE;
    params: any;
    teachers = [];
    limit = 60; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
    noMoreTeachers: boolean;

    constructor(
        public router: Router,
        public active: ActivatedRoute,
        public a: AppService
    ) {

        this.active.queryParams.subscribe(params => {
            console.log('params:', params);
            this.params = params;
            const options = {};
            if (params['idx_teacher']) {
                options['teachers'] = [params['idx_teacher']];
            }
            this.loadScheduleaAndDisplay(options);
        });



        // this.loadScheduleTable();
    }

    ngOnInit() {

    }

    /**
     * Load and display schedule table.
     * @param options options
     *
     * @todo
     *      - translate timezone into their country language.
     *      - log `activity log` into firebase.
     */
    loadScheduleaAndDisplay(options) {
        this.a.loadSchedule(options, re => {
            console.log('re: ', re);
            this.re = re;
        });
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

    onClickNavigate(navigate) {
        this.loadScheduleaAndDisplay({ navigate: navigate });
    }

}

