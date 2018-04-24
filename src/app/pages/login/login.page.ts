
import { Component, OnInit } from '@angular/core';
import { FireService, USER, USER_NOT_FOUND } from './../../modules/firelibrary/core';
import { AppService } from '../../providers/app.service';
import { Router } from '@angular/router';
import { USER_LOGIN } from '../../modules/xapi/interfaces';


@Component({
    selector: 'login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

    form = <USER_LOGIN>{};
    constructor(
        public router: Router,
        public fire: FireService,
        public a: AppService
    ) { }

    ngOnInit() {
    }

    /**
     * This method is being invoked when the user has logged in.
     */
    onLogin() {
        console.log(`User has logged in now`);
    }
    onSubmitLoginForm(event: Event) {
        event.preventDefault();


        this.a.user.login(this.form.user_email, this.form.user_pass).subscribe(re => {
            console.log('a.user.login() success: ');

            this.a.onUserLogin();

            /**
             *
	         * @desc If you work on a test/work server,
             *      you need to copy `XAPI_SECRET_CODE_SALT` from the real server into that test/work server
	         *      Or unless, the login will be invalid.
             *      And you will have problem with firebase.
             */
            this.fire.user.login(this.a.getFirebaseLoginEmail(re.ID), re.session_id)
                .then(x => {
                    console.log('fire.user.login() success: ');
                    // this.router.navigateByUrl('/');
                    this.onLogin();
                })
                .catch(e => { // Firebase login failed.
                    if (e.code === USER_NOT_FOUND) { // If user info not exist on firebase, then register.
                        console.log(`Yaiks. User exists on WordPress backend but not in firebase. Going to register into firebase`);
                        const data: USER = {
                            email: this.a.getFirebaseLoginEmail(re.ID),
                            password: re.session_id
                        };
                        this.fire.user.register(data).then(() => { // Firebase registration OK.
                            console.log('Firebase: user registered successfully: ');
                            this.fire.auth.onAuthStateChanged(user => { // Wait for firebase Login.
                                if (user) {
                                    const profile: USER = {
                                        email: re.user_email,
                                        displayName: re.display_name,
                                        name: re.name
                                    };
                                    profile['ID'] = re.ID;
                                    this.fire.user.create(profile).then(result => { // Firebase user doc create.
                                        console.log('Firebase. user data document created successfully: ', result);
                                        // Hereby, the user is already logged in.
                                        this.onLogin();
                                    }).catch(e2 => {
                                        console.log('register.page .registerFirebase > onAuthState.Changed > fire.user.create() failed()',
                                            this.form);
                                        this.a.toast(e2);
                                    });
                                }
                            });
                        })
                            .catch(e3 => {
                                this.a.toast('FAILURE_OF_FIREBASE_REGISTRATION_ON_LOGIN');
                            });
                    } else { // Firebaes Login Failed.
                        this.a.toast(e);
                    }

                });

            // this.a.open('home');
        }, e => {
            this.a.toast(e);
        });



        return false;
    }

}
