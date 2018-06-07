import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../providers/app.service';

interface Form {
    classPushNotification: '';
}

@Component({
    selector: 'settings-page',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})

export class SettingsPage implements OnInit {
    loader = {
        get: false,
        save: false
    };
    form: Form = <any>{};
    constructor(
        public a: AppService
    ) {
        this.loader.get = true;
        a.lms.admin_get_settings().subscribe(re => {
            this.loader.get = false;
            this.form = re;
        }, e => a.toast(e));
    }

    ngOnInit() { }

    onSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.loader.save = true;
        this.a.lms.admin_save_settings(this.form).subscribe(res => {
            this.loader.save = false;
            // console.log('admin_settings(): ', res);
        }, e => {
            this.loader.save = false;
            this.a.toast(e);
        });
        return false;
    }
}

