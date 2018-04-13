
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'schedule-table-page',
    templateUrl: 'schedule-table.page.html',
    styleUrls: ['schedule-table.page.scss'],
})
export class ScheduleTablePage implements OnInit {

    re;
    teachers = [];
    limit = 60; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.
    noMoreTeachers: boolean;

    constructor(
        public router: Router,
        public active: ActivatedRoute,
        public a: AppService
    ) {

        this.active.queryParams.subscribe(params => {
            console.log(params);
        });



        this.loadScheduleTable();
    }

    ngOnInit() {

    }

    loadScheduleTable() {
        this.a.loadSchedule(re => {
            console.log('re: ', re);
        });
    }

}

