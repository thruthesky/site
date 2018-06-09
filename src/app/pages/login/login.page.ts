
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { USER_LOGIN } from '../../modules/xapi/interfaces';


@Component({
    selector: 'login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

    form = <USER_LOGIN>{};
    loader = {
        submit: false
    };
    constructor(
        public a: AppService
    ) { }

    ngOnInit() {
    }

    /**
     * This method is being invoked when the user has logged in.
     */
    onLogin() {
        // console.log(`User has logged in now`);
    }
    onSubmitLoginForm(event?: Event) {
        if (event) {
            event.preventDefault();
        }

        this.loader.submit = true;

        this.a.user.login(this.form.user_email, this.form.user_pass).subscribe(re => {
            // console.log('a.user.login() success: ');

            this.a.onUserLogin();
            // this.firebaseLogin(re);
            this.a.openHome();
            this.loader.submit = false;
        }, e => {
            this.loader.submit = false;
            this.a.toast(e);
        });



        return false;
    }

}
