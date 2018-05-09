import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { AlertController } from '@ionic/angular';
import { STUDENT_COMMENTS_TO_TEACHER } from '../../modules/xapi/interfaces';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'session-comments-list-page',
    templateUrl: 'session-comments-list.page.html',
    styleUrls: ['session-comments-list.page.scss'],
})
export class SessionCommentsListPage implements OnInit {

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

    showloader = false;

    constructor(public a: AppService,
                public active: ActivatedRoute,
                public alertCtrl: AlertController
    ) {
        this.active.queryParams.subscribe(params => {

            /**
             * @Note for create idx_teacher is required.
             */
            if ( params['idx_teacher'] ) {
                this.idx_teacher = params['idx_teacher'];
                this.loadCommentList();
            }
        });


    }

    ngOnInit() {

    }

    loadCommentList() {
        const  data = {
            idx_teacher: this.idx_teacher,
            limit: this.pageOption.limitPerPage,
            page: this.pageOption.currentPage
        };
        this.showloader = true;
        this.a.lms.get_student_comments_to_teacher(data).subscribe((res: STUDENT_COMMENTS_TO_TEACHER) => {
            console.log('get_comment_from_student_to_teaceher:: ', res);
            if (res && res['comments'] && res['comments'].length) {
                this.comments = res['comments'];
            } else {
                this.error = 'No available review yet for this teacher.';
            }
            this.pageOption.currentPage = res['page'];
            this.pageOption.limitPerPage = res['limit'];
            this.pageOption.totalRecord = res['total'];
            this.showloader = false;
        }, e => {
            this.a.t(e);
            this.showloader = false;
        });
    }

    async onClickDelete(comment) {
        // console.log('user.id', this.a.user.id);
        // console.log("onClickDelete:: ", comment);

        const confirm = await this.alertCtrl.create({
            header: this.a.t('DELETE COMMENT'),
            subHeader: this.a.t('CONFIRM DELETE COMMENT'),
            buttons: [
                {
                    text: this.a.t('YES'),
                    handler: () => {
                        // console.log('Yes');
                        this.showloader = true;
                        const data = {
                            idx: comment.idx
                        };
                        this.a.lms.student_comment_to_teacher_delete(data).subscribe(res => {
                            // console.log("student_comment_to_teacher_delete:: ", res);
                            if (res['idx'] === comment.idx) {
                                comment.idx = '';
                                this.a.t('Comment Deleted...');
                            }
                            this.showloader = false;
                        }, e => {
                            this.a.toast(e);
                            this.showloader = false;
                        });
                    }
                },
                {
                    text: this.a.t('CANCEL'),
                    handler: () => {
                        // console.log('cancel');
                    }
                }
            ]
        });
        confirm.present();
    }


    onClickCommentEdit(comment) {
        // const createCommentModal = this.modalCtrl.create(StudentCommentEdit, {comment: comment}, {cssClass: 'student-comment-edit'}
        // );
        // createCommentModal.onDidDismiss(res => {
        //     // if(res && res['comment']) {
        //     //   console.log("comment", res['comment']);
        //     //   console.log("onClickCommentEdit::comment", comment);
        //     //   comment['comment'] = res.comment.comment;
        //     //   comment['rate'] = res.comment.rate;
        //     //   comment['rate'] = res.comment.rate;
        //     // }
        //
        //     if ( res === 'success') {
        //         this.loadCommentList();
        //     }
        // });
        // createCommentModal.present();
    }


    onClickCancel() {
        // this.viewCtrl.dismiss();
    }

    onPostPageClick($event) {
        this.pageOption['currentPage'] = $event;
        this.loadCommentList();
    }

    onClickCommentCreate() {
        // this.viewCtrl.dismiss('commentCreate');
    }
}

