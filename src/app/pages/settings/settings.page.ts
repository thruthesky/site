import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'settings-page',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss'],
})
export class SettingsPage {

    tz = {};

    userTZ = '0';
    showLoader = true;
    constructor(public a: AppService) {

        this.showLoader = true;
        a.lms.timezones().subscribe(re => {
            this.showLoader = false;
            // console.log( re);
            this.tz = re;
        }, e => {
            this.a.toast(e);
            this.showLoader = false;
        });

        if (a.user.isLogin) {
            a.lms.timezone().subscribe(re => {
                // console.log('timezone', re);
                this.userTZ = re['offset'];
            }, e => this.a.toast(e));
        }
    }

    keysTimezone() {
        return Object.keys(this.tz).sort((a: any, b: any) => a - b);
    }

    /**
     * Adds '+' sign on time zone.
     * @param offset timezone offset
     */
    format(offset) {
        if (offset > 0) {
            return '+' + offset;
        } else {
            return offset;
        }
    }


    onClickTimezone(offset) {
        // console.log(offset);
        this.a.lms.timezone_set(offset).subscribe(re => {
            // console.log(re);
            /**
             * We reload user's profile to update user information cache the new timezone.
             */
            this.a.user.loadProfile().subscribe(() => {
            });
        }, e => this.a.toast(e));
    }


}
