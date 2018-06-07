
import { Component, OnInit } from '@angular/core';
// import { FireService, USER, USER_NOT_FOUND, WRONG_PASSWORD } from './../../modules/firelibrary/core';
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
    loader = {
        submit: false
    };
    constructor(
        public router: Router,
        // public fire: FireService,
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

    // firebaseLogin(re) {

    //     /**
    //      *
    //      * @desc If you work on a test/work server,
    //      *      you need to copy `XAPI_SECRET_CODE_SALT` from the real server into that test/work server
    //      *      Or unless, the login will be invalid.
    //      *      And you will have problem with firebase.
    //      */
    //     this.fire.user.login(this.a.getFirebaseLoginEmail(re.ID), this.a.getFirebaseLoginPassword(re.ID))
    //         .then(x => {
    //             console.log('fire.user.login() success: ');
    //             // this.router.navigateByUrl('/');
    //             this.onLogin();
    //         })
    //         .catch(e => { // Firebase login failed.
    //             if (e.code === USER_NOT_FOUND) { // If user info not exist on firebase, then register.
    //                 console.log(`Yaiks. User exists on WordPress backend but not in firebase. Going to register into firebase`);
    //                 const data: USER = {
    //                     email: this.a.getFirebaseLoginEmail(re.ID),
    //                     password: this.a.getFirebaseLoginPassword(re.ID)
    //                 };
    //                 this.fire.user.register(data).then(() => { // Firebase registration OK.
    //                     console.log('Firebase: user registered successfully: ');
    //                     this.fire.auth.onAuthStateChanged(user => { // Wait for firebase Login.
    //                         if (user) {
    //                             const profile: USER = {
    //                                 email: re.user_email,
    //                                 displayName: re.display_name,
    //                                 name: re.name
    //                             };
    //                             profile['ID'] = re.ID;
    //                             this.fire.user.create(profile).then(result => { // Firebase user doc create.
    //                                 console.log('Firebase. user data document created successfully: ', result);
    //                                 // Hereby, the user is already logged in.
    //                                 this.onLogin();
    //                             }).catch(e2 => {
    //                                 console.log('register.page .registerFirebase > onAuthState.Changed > fire.user.create() failed()',
    //                                     this.form);
    //                                 this.a.toast(e2);
    //                             });
    //                         }
    //                     });
    //                 })
    //                     .catch(e3 => {
    //                         this.a.toast('FAILURE_OF_FIREBASE_REGISTRATION_ON_LOGIN');
    //                     });
    //             } else if (e.code === WRONG_PASSWORD) {
    //                 // this.form.user_email = '2.' + this.form.user_email;
    //                 // this.onSubmitLoginForm();
    //                 console.log('========> worng password: ', e.message);
    //                 this.a.toast(e);
    //             } else { // Firebaes Login Failed.
    //                 console.log('error on fire.user.login', e);
    //                 this.a.toast(e);
    //             }

    //         });
    // }

}
