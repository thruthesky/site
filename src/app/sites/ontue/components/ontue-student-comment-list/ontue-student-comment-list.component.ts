import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-student-comment-list-component',
    templateUrl: 'ontue-student-comment-list.component.html',
    styleUrls: ['ontue-student-comment-list.component.scss'],
})
export class OntueStudentCommentListComponent {


    @Input() student_comments = [];

    idx_teacher = null;

    constructor(public a: AppService) {
    }

}



