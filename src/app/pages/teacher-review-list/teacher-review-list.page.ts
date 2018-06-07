import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../providers/app.service';
import { STUDENT_COMMENTS_TO_TEACHER } from '../../modules/xapi/interfaces';
import { MatDialog } from '@angular/material';
import { ModalData, ModalService } from '../../providers/modal/modal.service';


@Component({
    selector: 'teacher-review-list-page',
    templateUrl: 'teacher-review-list.page.html',
    styleUrls: ['teacher-review-list.page.scss']
})
export class TeacherReviewListPage {


    params;
    idx_teacher;
    comments: STUDENT_COMMENTS_TO_TEACHER = <STUDENT_COMMENTS_TO_TEACHER>[];
    limit = 10;
    teacher_photoURL;
    teacher_name;


    error = null;

    pageOption = {
        limitPerPage: 10,
        currentPage: 1,
        limitPerNavigation: 4,
        totalRecord: 0
    };

    loading = true;

    showLoader = false;

    internet = ['', 'Bad', 'Normal', 'Good'];
    camera = ['No', 'Yes'];

    constructor(
        public a: AppService,
        public active: ActivatedRoute,
        public modal: ModalService,
    ) {
        this.active.queryParams.subscribe(params => {
            this.showLoader = true;
            if (params['idx_teacher']) {
                this.a.lms.get_teacher_info_by_idx(params['idx_teacher'], false).subscribe(re => {
                    // console.log('get_teacher_info_by_idx', re);

                    this.idx_teacher = re['ID'];
                    this.teacher_name = re['display_name'];
                    this.teacher_photoURL = re['photoURL'];
                    this.loadCommentList();
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

    loadCommentList() {
        const data = {
            idx_teacher: this.idx_teacher,
            limit: this.pageOption.limitPerPage,
            page: this.pageOption.currentPage
        };
        this.a.lms.get_student_comments_to_teacher(data).subscribe((res: STUDENT_COMMENTS_TO_TEACHER) => {
            // console.log("get_comment_from_student_to_teaceher:: ", res);
            if (res && res['comments'] && res['comments'].length) {
                this.comments = res['comments'];
            } else {
                this.error = 'No available review yet for this teacher.';
            }
            this.pageOption.currentPage = res['page'];
            this.pageOption.limitPerPage = res['limit'];
            this.pageOption.totalRecord = res['total'];
            this.loading = false;
        }, e => {
            // console.log('get_student_comments_to_teacher::error');
            this.a.toast(e);
            this.loading = false;
        });
    }

    onClickDelete(comment) {

        const data: ModalData = {
            title: this.a.t('COMMENT DELETE'),
            content: this.a.t('COMMENT DELETE CONFIRM'),
            yes: this.a.t('YES'),
            no: this.a.t('CANCEL')
        };
        this.modal.confirm(data).subscribe(result => {
            if ( result ) {
                this.showLoader = true;
                const q = {
                    idx: comment.idx
                };
                this.a.lms.student_comment_to_teacher_delete(q).subscribe(res => {
                    if (res['idx'] === comment.idx) {
                        comment.idx = '';
                        this.a.toast( this.a.t('COMMENT DELETED'));
                    }
                    this.showLoader = false;
                }, e => {
                    this.a.toast(e);
                    this.showLoader = false;
                });
            }
        });

    }


    onClickCommentEdit(comment) {
        // console.log('onClickCommentEdit', comment);
        this.a.open('teacher-review-edit', { idx_comment: comment.idx });
    }

    onPostPageClick($event) {
        this.pageOption['currentPage'] = $event;
        this.loadCommentList();
    }


}

