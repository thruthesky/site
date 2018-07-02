import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'admin-session-edit-page',
    templateUrl: 'admin-session-edit.page.html',
    styleUrls: ['admin-session-edit.page.scss']
})
export class AdminSessionEditPage implements OnInit {

    form = {
        idx_teacher: '',
        idx_student: '',
        date: '',
        class_begin: '',
        class_end: '',
        point: '',
        book_used: '',
        book_next: '',
        alert: '',
        domain: ''
    };
    idx = '';
    loader = {
        get: false,
        save: false
    };

    constructor(
        public a: AppService,
        public activated: ActivatedRoute
    ) {
        this.activated.paramMap.subscribe( params => {
            this.idx = params.get('idx');
            if ( this.idx ) {
                this.loader.get = true;
                this.a.lms.admin_session_get(this.idx).subscribe( re => {
                    this.form = re;
                    this.loader.get = false;
                }, e => this.a.toast(e));
            }
        });
    }

    ngOnInit() { }

    onSubmit(event: Event) {
        event.preventDefault();

        if ( !this.a.isSuperManager ) {
            return;
        }

        this.loader.save = true;
        this.form['idx'] = this.idx;
        this.a.lms.admin_session_save(this.form).subscribe( re => {
            this.form = re;
            this.loader.save = false;
        }, e => {
            this.loader.save = false;
            this.a.toast(e);
        });

        return false;
    }


}



