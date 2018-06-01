import {Component, ViewChild} from '@angular/core';
import {AppService} from '../../../../providers/app.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FILE, FILES, USER_DATA_RESPONSE, USER_UPDATE, USER_UPDATE_RESPONSE} from '../../../../modules/xapi/interfaces';
import {Router} from '@angular/router';
import {XapiFileUploadComponent} from '../../../../components/xapi-file-upload/xapi-file-upload.component';
import {MatDatepicker} from '@angular/material/datepicker';
import { LocationService } from '../../../../providers/location.service';


@Component({
    selector: 'ontue-my-curriculum-vitae-page',
    templateUrl: 'ontue-my-curriculum-vitae.page.html',
    styleUrls: ['ontue-my-curriculum-vitae.page.scss']
})
export class OntueMyCurriculumVitaePage {

    account: USER_UPDATE = <USER_UPDATE>{};

    files: FILES = [];
    qrmarks: FILES = [];
    @ViewChild('fileUploadWidget') fileUpload: XapiFileUploadComponent;
    @ViewChild('fileUploadWidgetQRMARK') fileUploadQRMark: XapiFileUploadComponent;
    @ViewChild('yeardp') yeardpHandler: string;

    showQRMark = false;
    birthday;
    today = new Date();
    minYear: number;

    youtube_thumbnail_url = '';
    youtube_video_url: SafeResourceUrl = '';
    play_video = false;

    showLoader = false;

    constructor(public a: AppService,
                public loc: LocationService,
                public sanitizer: DomSanitizer,
                public router: Router) {

        this.minYear = this.today.getFullYear() - 10;


        if (a.user.isLogin && a.isTeacher) {
            this.loadData();
        } else {
            this.router.navigateByUrl('/');
            this.a.toast('User type must be teacher and should login first...');
        }

    }


    loadData() {
        this.a.user.data().subscribe((userData: USER_DATA_RESPONSE) => {
            console.log('userData::', userData);
            this.account.name = userData.name;
            this.account.fullname = userData.fullname;
            this.account.nickname = userData.nickname;
            this.account.user_email = userData.user_email;
            this.account.phone_number = userData.phone_number;
            this.account.gender = userData.gender;
            if (userData.birthday.length > 0) {
                this.birthday = userData.birthday.substr(0, 4) + '-' + userData.birthday.substr(4, 2) + '-' + userData.birthday.substr(6, 2);
                this.account.birthday = this.birthday;
            }
            this.account.address = userData.address;
            this.account.nationality = userData.nationality;
            this.account.last_education = userData.last_education;
            this.account.major = userData.major;
            this.account.hobby = userData.hobby;
            this.account.experience = userData.experience;
            this.account.introduction = userData.introduction;
            this.account['display_name'] = userData['display_name'];
            this.account.kakaotalk_id = userData.kakaotalk_id;


            if (userData.youtube_video_url) {
                this.account.youtube_video_url = userData.youtube_video_url;
                if (userData.youtube_video_url.match(/^http:\/\//i)) {
                    userData.youtube_video_url = userData.youtube_video_url.replace(/^http:\/\//i, 'https://');
                } // replace http to https
                if (userData.youtube_video_url.match(/youtu.be/g)) {
                    userData.youtube_video_url = userData.youtube_video_url.replace(/youtu.be/g, 'youtube.com/embed');
                } // replace youtu.be to youtube.com/embed

                const imageUrl: any = userData.youtube_video_url.replace(/embed/g, 'vi');
                this.youtube_thumbnail_url = imageUrl.match(/youtube.com/g, 'img.youtube.com') ? imageUrl.replace(/youtube.com/g, 'img.youtube.com') + '/mqdefault.jpg' : 'assets/images/teacher/no-video.jpg';
                // this.youtube_thumbnail_url = this.sanitizer.bypassSecurityTrustUrl(this.youtube_thumbnail_url);

                // console.log("youtube_thumbnail_url", this.youtube_thumbnail_url);
                //
                // console.log("userData.youtube_video_url", userData.youtube_video_url);

                if (userData.youtube_video_url) {
                    const videoUrl = userData.youtube_video_url + '?autoplay=1&loop=1';
                    this.youtube_video_url = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
                } else {
                    this.youtube_video_url = '';
                }

            } else {
                this.account.youtube_video_url = '';
            }


            if (userData.primary_photo.id) {
                this.files = [userData.primary_photo];
            }
            if (userData.kakao_qrmark_photo.id) {
                this.qrmarks = [userData.kakao_qrmark_photo];
                this.showQRMark = true;
            }


            this.account.kakao_qrmark_string = userData.kakao_qrmark_string;
            this.account.kakao_qrmark_URL = userData.kakao_qrmark_URL;
            if (this.account.kakao_qrmark_URL && !this.account.kakao_qrmark_string) {
                this.a.lms.update_kakao_qrmark_string().subscribe(re => {
                    // console.log( re );
                    if (re['kakao_qrmark_string']) {
                        this.account.kakao_qrmark_string = re['kakao_qrmark_string'];
                    }
                }, e => this.a.toast(e));
            }
        }, error => this.a.toast(error));
    }

    onSubmitUpdate() {
        // console.log("onSubmitUpdate", this.account);
        if (!this.account.name || !this.account.name.length) {
             this.a.toast('*Name is required...');
            return;
        }
        if (!this.account.user_email || !this.account.user_email.length) {
            this.a.toast('*Email is required...');
            return;
        }
        if (!this.qrmarks.length) {
            this.a.toast('*Teacher must upload QR Mark...');
            return;
        }
        // this.account.photoURL = this.files.length ? this.files[0].url : '';

        delete this.account.kakao_qrmark_string;
        delete this.account.kakao_qrmark_URL;

        this.showLoader = true;
        console.log('account', this.account);
        this.a.user.update(this.account).subscribe((res: USER_UPDATE_RESPONSE) => {
            // console.log('curriculum vitae:', res);
            this.showLoader = false;
            this.a.toast('Curriculum vitae Updated');
            this.loadData();
        }, err => {
            this.a.toast(err);
            this.showLoader = false;
        });
    }


    onSuccessUploadPicture(file: FILE) {

        // console.log("onSuccessUpdateProfilePicture::file:: ", file);
        // console.log("onSuccessUpdateProfilePicture::files:: ", this.files);
        //

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
            user_email: this.account.user_email
        };

        if (this.a.user.isLogin) {
            this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {

                // console.log("updatePrimaryPhoto", file);
                this.files[0] = file;
                this.a.render();
            }, err => {
                this.a.toast(err);
            });
        }

    }


    onSuccessUploadQRMark(file: FILE) {
        this.showQRMark = false;
        if (this.qrmarks.length > 1) {
            this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {
            }, e => this.a.toast(e));
        }

        const data: USER_UPDATE = {
            kakao_qrmark_URL: file.url,
            user_email: this.account.user_email
        };
        this.a.user.update(data).subscribe(() => {
            this.a.lms.update_kakao_qrmark_string().subscribe(re => {
                // console.log("update_kakao_qrmark_string",re);
                if (!re.kakao_qrmark_string) {
                    this.a.toast('Invalid QR MARK, Please try again');
                    this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {
                        this.qrmarks = [];
                        this.a.render();
                    }, e => this.a.toast(e));
                } else {
                    this.qrmarks = [file];
                    this.showQRMark = true;
                    this.a.render();
                }
            }, () => {
                this.a.toast('Failed to convert QR mark. There may be an error on server while converting QR mark.');
                this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {
                    this.qrmarks = [];
                    this.a.render();
                }, e => this.a.toast(e));
            });
        }, e => this.a.toast(e));
    }


    onChangeBirthDate() {
        // console.log("Birthday:: ",this.birthday);
        this.account.birthday = this.birthday.replace(/\-/g, '');
        // console.log("Birthday:: ",this.account.birthday);
    }


    set _birthday( date ) {
        const d = new Date(date);
        this.birthday = d.getFullYear() + '-' + this.a.add0((d.getMonth() + 1)) + '-' + this.a.add0(d.getDate());
        this.onChangeBirthDate();
    }
    get _birthday() {
        return this.birthday;
    }

    onYearSelected(event, yeardp) {
        const d = new Date(event);
        console.log(d.getFullYear());
        this.account.experience = '' + d.getFullYear();
        yeardp.close();

    }

}

