
import { Component, OnInit, ViewChild } from '@angular/core';
import { FireService, USER } from './../../modules/firelibrary/core';
import { AppService } from '../../providers/app.service';
import {
    USER_REGISTER, USER_REGISTER_RESPONSE, USER_DATA_RESPONSE, FILES, USER_UPDATE, USER_UPDATE_RESPONSE
} from '../../modules/xapi/interfaces';
import { XapiFileUploadComponent } from '../../components/xapi-file-upload/xapi-file-upload.component';


@Component({
    selector: 'app-component-register',
    templateUrl: 'register.page.html',
    styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {

    /**
     * For form variables
     *
     */
    form = <USER_REGISTER>{};
    birthday;
    year: string;
    month: string;
    day: string;
    files: FILES = [];
    qrmarks: FILES = [];
    // @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.ehcawgq9o2ps
    @ViewChild('profilePhotoUpload') fileUpload: XapiFileUploadComponent;



    show = {
        dataLoader: false,
        registerLoader: false
    };

    user_type: '' | 'S' | 'T';


    timezones;
    timezoneOffset;
    constructor(
        public fire: FireService,
        public a: AppService,
    ) {
        setTimeout(() => this.test(), 1000);


        this.setTimezone();
        if (a.user.isLogin) {
            this.loadData();
        }
    }

    test() {
        // this.testRegister();
    }
    testRegister() {
        const id = this.a.randomString('user');
        this.form.user_email = id + '@gmail.com';
        this.form.user_login = this.form.user_email;
        this.form.user_pass = id;
        this.form.display_name = id;
        this.form.kakaotalk_id = id;
        this.form.domain = this.a.getDomain();
        this.registerWordpressBackend();
    }

    ngOnInit() {
        // this.form.email = 'test' + (new Date).getTime() + '@user.com';
        // this.form.password = this.form.email;
        // this.form.displayName = 'Name';
        // this.onSubmitRegisterForm();
    }

    setTimezone() {
        this.timezoneOffset = this.a.lms.getUserLocalTimezoneOffset();
        this.a.lms.timezones().subscribe(re => {
            this.timezones = re;
        });
    }


    loadData() {
        this.show.dataLoader = true;
        this.a.user.data().subscribe((userData: USER_DATA_RESPONSE) => {
            this.show.dataLoader = false;
            console.log('userData::', userData);
            this.form.user_email = userData.user_email;
            this.form.name = userData.name;
            this.form['display_name'] = userData['display_name'];
            this.form.phone_number = userData.phone_number;
            this.form.kakao_qrmark_URL = userData.kakao_qrmark_URL;
            this.form.bookable_time = userData.bookable_time;
            this.user_type = userData.user_type;
            if (userData.birthday.length > 0) {
                this.year = userData.birthday.substr(0, 4);
                this.month = userData.birthday.substr(4, 2);
                this.day = userData.birthday.substr(6, 2);
                this.birthday = '' + this.year + '-' + this.month + '-' + this.day; // old
                this.form.birthday = '' + this.year + this.month + this.day;
            }
            this.form.gender = userData.gender;
            if (userData.primary_photo.id) {
                this.files = [userData.primary_photo];
            }
            if (userData.kakao_qrmark_photo.id) {
                this.qrmarks = [userData.kakao_qrmark_photo];
            }


            /// Check if QR Mark converting has been failed.
            ///
            this.form.kakaotalk_id = userData.kakaotalk_id;
            this.form['kakao_qrmark_string'] = userData.kakao_qrmark_string;
            if (this.form.kakao_qrmark_URL && !this.form.kakao_qrmark_string) {
                this.a.lms.update_kakao_qrmark_string().subscribe(re => {
                    // console.log(re);
                    if (re['kakao_qrmark_string']) {
                        this.form.kakao_qrmark_string = re['kakao_qrmark_string'];
                    }
                }, e => this.a.toast(e));
            }
            /// eo


        }, e => {
            this.show.dataLoader = false;
            this.a.toast(e);
        });
    }


    onRegisterSuccess() {
        //
    }
    onRegisterFailure(e) {
        //
        console.log('Error on register: ', e);
        this.a.toast(e);
    }
    onUpdateSuccess() {
        //
    }
    onUpdateFailure() {
        //
    }
    onSubmitRegisterForm(event?: Event) {

        if (event) {
            event.preventDefault();
        }
        this.form.domain = this.a.getDomain();
        this.registerWordpressBackend();
        return false;

    }

    /**
     * Register into WordPress backend first before register into Firebase.
     */
    registerWordpressBackend() {
        this.form.user_login = this.form.user_email;
        this.a.user.register(this.form)
            .subscribe(re => this.registerFirebase(re), e => this.onRegisterFailure(e));
    }
    registerFirebase(res: USER_REGISTER_RESPONSE) {
        console.log('registerFirebase(res): ', res);
        const data: USER = {
            email: this.a.getFirebaseLoginEmail(res.ID),
            password: res.session_id
        };
        this.fire.user.register(data).then(() => {
            console.log('Firebase: user registered successfully: ');
            this.fire.auth.onAuthStateChanged(user => {
                if (user) {
                    const profile: USER = {
                        email: res.user_email,
                        displayName: res.display_name,
                        name: res.name
                    };
                    profile['ID'] = res.ID;
                    this.fire.user.create(profile).then(re => {
                        console.log('Firebase. user data document created successfully: ', re);
                        // this.a.openProfile();
                    }).catch(e => {
                        console.log('register.page .registerFirebase > onAuthState.Changed > fire.user.create() failed()', this.form);
                        this.onRegisterFailure(e);
                    });
                }
            });
        })
            .catch(e => this.onRegisterFailure(e));

    }


    onSuccessUploadPicture(file) {
        // console.log("onSuccessUpdateProfilePicture::", this.files);

        /**
         * Delete previous photo.
         *
         * file[0]
         */
        if (this.files.length > 1) { /// If there are two files, one for prvious photo, the other is for new photo.
            this.fileUpload.deleteFile(this.files[0], () => this.updatePrimaryPhoto(file), () => this.updatePrimaryPhoto(file));
        } else {
            this.updatePrimaryPhoto(file);
        }


    }


    updatePrimaryPhoto(file) {

        const data: USER_UPDATE = {
            photoURL: this.files[0].url,
            user_email: this.form.user_email
        };

        if (this.a.user.isLogin) {
            this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {

                // console.log("updatePrimaryPhoto", file);
                this.files[0] = file;
                this.a.render(100);
                this.a.render(5000); // on mobile, the image is updated very late.
                this.a.render(15000);
            }, err => {
                this.a.toast(err);
            });
        }

    }



    userProfilePhoto(files) {
        if (files.length) {
            if (files[0]['url_portrait']) {
                return files[0]['url_portrait'];
            } else {
                return files[0]['url'];
            }
        } else {
            return this.a.anonymousPhotoURL;
        }
    }



  onClickKakaoIDHelp() {
    // if (this.a.isTeacher) {
    //   this.showModalFAQ('kakaoID');
    // }
    // else {
    //   this.showFindKakaotalkIDBox = true;
    //   setTimeout(() => {
    //     document.querySelector('.kakaotalk-id-find-box').scrollIntoView();
    //   }, 200);
    //   this.a.alert("프로필 관리 메뉴에서 카카오톡 아이디를 찾을 수 있습니다.");
    // }
  }


}
