import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../providers/app.service';
import { STUDENT_COMMENTS_TO_TEACHER } from '../../modules/xapi/interfaces';
import { AlertController } from '@ionic/angular';
import { _CONFIRM_DATA_OPTION, ConfirmModal } from '../../components/modal/confirm/confirm.modal';
import { MatDialog } from '@angular/material';


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

    constructor(public a: AppService,
                public router: Router,
                public active: ActivatedRoute,
                public dialog: MatDialog,
                public alertCtrl: AlertController
    ) {
        this.active.queryParams.subscribe(params => {
            this.showLoader = true;
            if (params['idx_teacher']) {
                this.a.lms.get_teacher_info_by_idx(params['idx_teacher'], false).subscribe(re => {
                    console.log('get_teacher_info_by_idx', re);

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
            console.log('get_student_comments_to_teacher::error');
            this.a.toast(e);
            this.loading = false;
        });
    }

    async onClickDelete(comment) {

        // const confirm = await this.alertCtrl.create({
        //     header: this.a.t('DELETE COMMENT'),
        //     subHeader: this.a.t('CONFIRM DELETE COMMENT'),
        //     buttons: [
        //         {
        //             text: this.a.t('YES'),
        //             handler: () => {
        //                 // console.log('Yes');
        //                 this.showLoader = true;
        //                 const data = {
        //                     idx: comment.idx
        //                 };
        //                 this.a.lms.student_comment_to_teacher_delete(data).subscribe(res => {
        //                     // console.log("student_comment_to_teacher_delete:: ", res);
        //                     if (res['idx'] === comment.idx) {
        //                         comment.idx = '';
        //                         this.a.toast('Comment Deleted...');
        //                     }
        //                     this.showLoader = false;
        //                 }, e => {
        //                     this.a.toast(e);
        //                     this.showLoader = false;
        //                 });
        //             }
        //         },
        //         {
        //             text: this.a.t('CANCEL'),
        //             handler: () => {
        //                 // console.log('cancel');
        //             }
        //         }
        //     ]
        // });
        // confirm.present();

        const dialogRef = this.dialog.open(ConfirmModal, {
            data: <_CONFIRM_DATA_OPTION>{
                header: this.a.t('DELETE COMMENT'),
                content: this.a.t('CONFIRM DELETE COMMENT'),
                actionYes: this.a.t('YES'),
                actionNo: this.a.t('CANCEL')
            }
        });


        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if ( result ) {
                this.showLoader = true;
                const data = {
                    idx: comment.idx
                };
                this.a.lms.student_comment_to_teacher_delete(data).subscribe(res => {
                    // console.log("student_comment_to_teacher_delete:: ", res);
                    if (res['idx'] === comment.idx) {
                        comment.idx = '';
                        this.a.toast('Comment Deleted...');
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
        console.log('onClickCommentEdit', comment);
        this.router.navigate(['teacher-review-edit'], {queryParams: {idx_comment: comment.idx}});
    }


    onClickCancel() {
        this.router.navigate(['schedule-table'], {queryParams: {idx_teacher: this.idx_teacher}});
    }

    onPostPageClick($event) {
        this.pageOption['currentPage'] = $event;
        this.loadCommentList();
    }

    onClickCommentCreate() {
        this.router.navigate(['teacher-review-create'], {queryParams: {idx_teacher: this.idx_teacher}});
    }


}

