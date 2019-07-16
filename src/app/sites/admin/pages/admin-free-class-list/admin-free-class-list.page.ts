import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';
import { BOOK } from '../../../../modules/xapi/interfaces';

export interface STUDENT_FREE_CLASS {
    ID: string;
    class_software: string;
    class_software_id: string;
    display_name: string;
    free_class_by_class_software_id: number;
    free_class_by_id: number;
    free_class_by_refund_in_progress: number;
    free_class_by_refunded: number;
    name: number;
    sessions: any;
}


@Component({
    selector: 'admin-free-class-list-page',
    templateUrl: 'admin-free-class-list.page.html',
    styleUrls: ['admin-free-class-list.page.scss']
})
export class AdminFreeClassListPage implements OnInit {

    ID: string = null;
    students: Array<STUDENT_FREE_CLASS> = null;
    student: STUDENT_FREE_CLASS = null;
    sessions: Array<BOOK> = [];
    book: BOOK = <BOOK>{};
    form = {
        ID: '',
        limit: 150,
        page_no: 1
    };

    loader = {
        list: false,
        student: false
    };

    display = {
        reserved_at: false,
        paid: false,
        refund_request_at: false,
        refund_request_message: false,
        refund_reject_at: false,
        refund_reject_message: false,
        refund_done_at: false,
        refund_done_by: false,
        refund_done_point: false,
        refund_settle_at: false,
        refund_settle_message: false,
        teacher_absent: false,
        student_absent: false,
        successful: false,
        expression: false,
        vocabulary: false,
        grammar: false,
        pronunciation: false,
        speed: false,
        comment: false,
        book_used: false,
        book_next: false,
        stamp_checked: false,
        class_software: false
    };

    currentLimit: number;

    constructor(
        public a: AppService,
        public activated: ActivatedRoute
    ) {
        const d = (new Date);


        activated.paramMap.subscribe(params => {
            // console.log('params: ', params);

            if ( params.get('ID') ) {
                this.ID = params.get('ID');
                this.loadStudentFreeClass(this.ID);
            }

            this.loadFreeClass();

        });
    }

    ngOnInit() { }


    onSubmit(event) {
        if (event) {
            event.preventDefault();
        }
        console.log('onSubmit::', this.form);
        this.loadStudentFreeClass(this.form.ID);

        console.log(`${this.currentLimit} !== ${this.form.limit}`);
        if (this.currentLimit !== this.form.limit) {
          this.loadFreeClass();
        }
    }


    loadStudentFreeClass(ID) {
        this.loader.student = true;
        this.form.ID = ID;
        this.a.scrollToTop();
        this.a.lms.admin_get_free_class_by_id({ID: ID}).subscribe( re => {
            this.student = re;
            // console.log('admin_get_free_class_by_id:: id', re);
            this.loader.student = false;
        }, e => {
            this.a.toast(e);
            this.loader.student = false;
        });
    }

    loadFreeClass() {
        this.loader.list = true;
        this.currentLimit = this.form.limit;
        this.a.lms.admin_get_free_class_list_count({limit: this.currentLimit, page_no: this.form.page_no}).subscribe( re => {
            // console.log('admin_get_free_class_list_count', re);
            this.students = re;
            this.loader.list = false;
        }, e => {
            this.a.toast(e);
            this.loader.list = false;
        });
    }

}



