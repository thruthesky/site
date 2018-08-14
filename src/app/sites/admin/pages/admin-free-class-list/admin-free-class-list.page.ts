import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';
import { BOOK } from '../../../../modules/xapi/interfaces';



@Component({
    selector: 'admin-free-class-list-page',
    templateUrl: 'admin-free-class-list.page.html',
    styleUrls: ['admin-free-class-list.page.scss']
})
export class AdminFreeClassListPage implements OnInit {

    ID: string = null;
    sessions: Array<BOOK> = [];
    book: BOOK = <BOOK>{};
    form = {
        ID: '',
        limit: 150
    };

    loader = {
        list: false
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


    }

    loadFreeClass() {
        this.loader.list = true;
        this.a.lms.admin_get_free_class_list().subscribe( re => {
            console.log('admin_get_free_class_list', re);
            this.loader.list = false;
        }, e => {
            this.a.toast(e);
            this.loader.list = false;
        });
    }

}



