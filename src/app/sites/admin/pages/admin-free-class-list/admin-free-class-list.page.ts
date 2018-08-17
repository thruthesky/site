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
    };

    loader = {
        list: false,
        student: false
    };
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

    }


    loadStudentFreeClass(ID) {
        this.loader.student = true;
        this.a.lms.admin_get_free_class_by_id({ID: ID}).subscribe( re => {
            this.student = re;
            console.log('admin_get_free_class_by_id:: id', re);
            this.loader.student = false;
        }, e => {
            this.a.toast(e);
            this.loader.student = false;
        });
    }

    loadFreeClass() {
        this.loader.list = true;
        this.a.lms.admin_get_free_class_list_count({limit: 150}).subscribe( re => {
            console.log('admin_get_free_class_list_count', re);
            this.students = re;
            this.loader.list = false;
        }, e => {
            this.a.toast(e);
            this.loader.list = false;
        });
    }

}



