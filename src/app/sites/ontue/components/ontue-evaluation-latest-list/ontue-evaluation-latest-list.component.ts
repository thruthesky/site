import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-evaluation-latest-list-component',
    templateUrl: 'ontue-evaluation-latest-list.component.html',
    styleUrls: ['ontue-evaluation-latest-list.component.scss'],
})
export class OntueEvaluationLatestListComponent {

    evaluations = [];


    pageOption = {
        limitPerPage: 5,
        currentPage: 1,
        limitPerNavigation: 4,
        totalRecord: 0
    };

    commentCount = 1;



    constructor(public a: AppService) {

        this.loadEvaluations();
    }



    loadEvaluations() {
        const data = {
            limit: this.pageOption.limitPerPage,
            page: this.pageOption.currentPage
        };
        this.a.lms.get_teacher_evaluations_to_student(data).subscribe(res => {
            // console.log(res);
            this.evaluations = res['comments'];
            this.pageOption.currentPage = res['page'];
            this.pageOption.limitPerPage = res['limit'];
            this.pageOption.totalRecord = res['total'];
            this.commentCount = res['page'];
        }, error => {
            this.a.alert(error);
        });
    }

    onPostPageClick($event) {
        this.pageOption['currentPage'] = $event;
        this.loadEvaluations();
    }

    preDate(date) {
        if (!date) {
            return '';
        }
        const y = date.slice(0, 4);
        const m = date.slice(4, 6);
        const d = date.slice(6, 9);
        return `${y}-${m}-${d}`;
    }

}



