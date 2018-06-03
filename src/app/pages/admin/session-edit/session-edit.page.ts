import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../providers/app.service';

@Component({
    selector: 'session-edit-page',
    templateUrl: 'session-edit.page.html',
    styleUrls: ['session-edit.page.scss']
})

export class SessionEditPage implements OnInit {
    form = {
        idx_teacher: '',
        idx_student: '',
        date: '',
        class_begin: '',
        class_end: '',
        point: '',
        book_used: '',
        book_next: ''
    };
    idx = '';
    loader = {
        get: false,
        save: false
    };
    constructor(
        public activated: ActivatedRoute,
        public a: AppService
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


