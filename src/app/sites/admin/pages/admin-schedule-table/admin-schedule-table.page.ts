import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';
import { TEACHER } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'admin-schedule-table-page',
    templateUrl: 'admin-schedule-table.page.html',
    styleUrls: ['admin-schedule-table.page.scss']
})
export class AdminScheduleTablePage implements OnInit {
    teacher: TEACHER = null;
    schedules: any = null;
    loading = false;

    constructor(
        public a: AppService,
        public activated: ActivatedRoute
    ) {
        const d = (new Date);

        activated.paramMap.subscribe(params => {
            if (params.get('ID')) {
                this.loading = true;
                this.a.lms.teacher_schedule_table_get(params.get('ID')).subscribe( re => {
                    console.log('teacher_schedule_table_get: ', re);
                    this.schedules = re['schedules'];
                    this.teacher = re['teacher'];
                    this.loading = false;
                }, e => {
                    this.a.toast(e);
                    this.loading = false;
                });
            }
        });
    }

    ngOnInit() { }

}



