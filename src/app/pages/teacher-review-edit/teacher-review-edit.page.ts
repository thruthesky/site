import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../providers/app.service';
import { STUDENT_COMMENT_TO_TEACHER, STUDENT_COMMENTS_TO_TEACHER } from '../../modules/xapi/interfaces';


@Component({
    selector: 'teacher-review-edit-page',
    templateUrl: 'teacher-review-edit.page.html',
    styleUrls: ['teacher-review-edit.page.scss']
})
export class TeacherReviewEditPage {


    params;
    idx_teacher;
    data: STUDENT_COMMENT_TO_TEACHER = <STUDENT_COMMENT_TO_TEACHER>{};

    comment = '';
    rate = 3;

    showLoader = false;

    constructor(public a: AppService,
                public router: Router,
                public active: ActivatedRoute) {
        this.active.queryParams.subscribe(params => {
            this.showLoader = true;

            /**
             * @Note for create idx_teacher is required.
             */
            if ( params['idx_teacher'] ) {
                this.data['idx_teacher'] = params['idx_teacher'];
                this.showLoader = false;
            } else   /** @Note for edit idx_review is required. */
                if ( params['idx_comment'] ) {
                this.a.lms.student_comment_to_teacher_by_idx({idx: params['idx_comment']}).subscribe(re => {
                    console.log('student_comment_to_teacher_by_idx', re);
                    this.data = re;
                    this.rate = re['rate'];
                    this.comment = re['comment'];
                    this.showLoader = false;
                }, e => {
                    this.a.toast(e);
                    this.showLoader = false;
                });
            }
        });
    }

    onClickSubmit() {

        if (this.comment.length < 10) {
            this.a.toast('코멘트가 너무 짧습니다.');
            return;
        }

        this.data['comment'] = this.comment;
        this.data['rate'] = this.rate;

        if (this.showLoader) {
            return;
        }
        this.showLoader = true;


        // console.log("data::", this.data);
        this.a.lms.student_comment_to_teacher_edit(this.data).subscribe(res => {
            this.a.onStudentCommentToTeacher();
            // console.log("student_comment_to_teacher_edit", res);
            this.a.toast('코멘트를 작성하였습니다.');
            // this.viewCtrl.dismiss({comment:res['comment']});
            this.showLoader = false;
            this.router.navigate(['schedule-table'], {queryParams: {idx_teacher: this.data['idx_teacher']}});
        }, e => {
            this.showLoader = false;
            this.a.toast(e);
        });
    }

    onClickCancel() {
        this.router.navigate(['schedule-table'], {queryParams: {idx_teacher: this.data['idx_teacher']}});
    }


}

