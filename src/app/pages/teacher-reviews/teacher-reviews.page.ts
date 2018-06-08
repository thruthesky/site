import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'teacher-reviews-page',
    templateUrl: 'teacher-reviews.page.html',
    styleUrls: ['teacher-reviews.page.scss'],
})
export class TeacherReviewsPage {

    comments = [];

    pageOption = {
        limitPerPage: 10,
        currentPage: 1,
        limitPerNavigation: 4,
        totalRecord: 0
    };

    idx_teacher = null;

    showLoader = false;

    constructor(
        public a: AppService
    ) {
        this.loadClassComment();
    }


    loadClassComment() {
        this.showLoader = true;
        this.a.lms.get_latest_student_comment_to_teachers({
            limit: this.pageOption['limitPerPage'],
            page: this.pageOption['currentPage']
        }).subscribe(res => {
            // console.log("loadClassComment:: ", res);
            this.comments = res['comments'];
            this.pageOption.currentPage = res['page'];
            this.pageOption.limitPerPage = res['limit'];
            this.pageOption.totalRecord = res['total'];
            this.showLoader = false;
        }, e => {
            this.a.toast(e);
            this.showLoader = false;
        });

    }

    onClickShowMore(comment) {
        // console.log('onClickShowMore::', comment);
        this.a.open('teacher-review-list', {idx_teacher: comment['idx_teacher']});
    }


    onPostPageClick($event) {
        this.pageOption['currentPage'] = $event;
        this.loadClassComment();
    }

}

