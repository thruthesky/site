import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../providers/app.service';
import { USER_DATA_RESPONSE } from '../../modules/xapi/interfaces';



@Component({
    selector: 'teacher-curriculum-vitae-view-page',
    templateUrl: 'teacher-curriculum-vitae-view.page.html',
    styleUrls: ['teacher-curriculum-vitae-view.page.scss']
})
export class TeacherCurriculumVitaeViewPage {


    teacher: USER_DATA_RESPONSE = null;

    showLoader = false;

    constructor(
        public a: AppService,
        public router: Router,
        public active: ActivatedRoute
    ) {
        this.active.queryParams.subscribe(params => {
            this.showLoader = true;
            if (params['idx_teacher']) {
                this.a.lms.get_teacher_info_by_idx(params['idx_teacher'], true).subscribe( re => {
                    // console.log('get_teacher_info_by_idx', re);
                    this.teacher = re;
                    this.showLoader = false;
                }, e => {
                    this.a.toast(e);
                    this.showLoader = false;
                });
            } else {
                this.a.toast(this.a.t('IDX TEACHER MISSING'));
                this.showLoader = false;
            }
        });
    }





}

