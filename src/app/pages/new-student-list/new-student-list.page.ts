import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MessageSendModalService } from '../../providers/message-send-modal/message-send-modal.service';
import { STUDENT_LIST_OPTION } from '../../modules/xapi/interfaces';

@Component({
    selector: 'new-student-list-page',
    templateUrl: 'new-student-list.page.html',
    styleUrls: ['new-student-list.page.scss']
})
export class NewStudentListPage implements OnInit {
    students: STUDENT_LIST_OPTION = null;

    pageOption = {
        limitPerPage: 10,
        currentPage: 1,
        limitPerNavigation: 4,
        totalRecord: 0
    };

    showLoader = false;
    uid = '';

    constructor(
        public a: AppService,
        public messageSend: MessageSendModalService
    ) {

        this.loadNewStudent();
    }

    loadNewStudent() {
        this.showLoader = true;
        this.a.lms.get_latest_student_register({
            uid: this.uid,
            limit: this.pageOption['limitPerPage'],
            page: this.pageOption['currentPage']
        }).subscribe( res => {
            console.log('students:: ', res);
            this.pageOption.currentPage = res['page'];
            this.pageOption.limitPerPage = res['limit'];
            this.pageOption.totalRecord = res['total'];
            this.students = res['students'];
            this.showLoader = false;
        }, e => {
            this.a.toast(e);
            this.showLoader = false;
        });
    }


    ngOnInit() { }

    onPageClick($event) {
        this.pageOption['currentPage'] = $event;
        this.loadNewStudent();
    }


    onSubmitUserSearch() {
        this.pageOption.currentPage = 1;
        this.pageOption.limitPerPage = 10;
        this.pageOption.totalRecord = 0;
        this.loadNewStudent();
    }

}



