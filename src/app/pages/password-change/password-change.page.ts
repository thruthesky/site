import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { USER_CHANGE_PASSWORD } from '../../modules/xapi/interfaces';

@Component({
    selector: 'password-change-page',
    templateUrl: 'password-change.page.html',
    styleUrls: ['password-change.page.scss'],
})
export class PasswordChangePage {

    changePassword: USER_CHANGE_PASSWORD = <USER_CHANGE_PASSWORD>{};

    constructor(public a: AppService) {

    }


    onClickChangePassword() {
        this.a.user.changePassword(this.changePassword).subscribe(re => {
            this.a.toast(this.a.t('PASSWORD CHANGED SUCCESS'));
            this.changePassword = {old_password: null, new_password: null};
        }, e => {
            this.a.toast(e);
        });
    }



}
