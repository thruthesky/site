import { Component, Input } from '@angular/core';
import { AppService } from '../../../providers/app.service';
import { SCHEDULE_TABLE } from '../../../modules/xapi/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'schedule-table-profile-component',
    templateUrl: './schedule-table-profile.component.html',
    styleUrls: ['./schedule-table-profile.component.scss']
})
export class ScheduleTableProfileComponent {
    @Input() isSingleTeacher = false;
    @Input() isLoadComplete = true;
    @Input() re: SCHEDULE_TABLE = null;
    @Input() teacherName = null;


    /**
     * Teacher's youtube URL with dom sanitizing.
     */
    urlYoutube = null;

    constructor(
        public domSanitizer: DomSanitizer,
        public readonly a: AppService
    ) {
        //
    }

    onClickAddKakao() {
        const url = this.re.teacher.kakao_qrmark_string;
        // console.log("kakao::url:: ", url);
        if (url) {
            window.open(url, '_blank');
        } else {
            this.a.toast(this.a.t('TEACHER_DOES_NOT_HAVE_KAKAOTALK_ID'));
        }
    }


    onClickShowCurriculum() {
        alert('show curriculmn vitae');
        // const createCommentModal = this.modalCtrl.create(CurriculumVitaeView, { teacher: this.teacher_profile }, { cssClass: 'vitae-view' }
        // );
        // createCommentModal.onDidDismiss(() => { });
        // createCommentModal.present();
    }

    onClickCommentList() {
        alert('show comments');
        // const createCommentModal = this.modalCtrl.create(StudentCommentList, { idx_teacher: this.teacher_profile['ID'], teacher_photoURL: this.teacher_profile['photoURL'], teacher_name: this.teacher_profile['name'] }, { cssClass: 'student-comment-list' }
        // );
        // createCommentModal.onDidDismiss(reason => {
        //   if (reason == 'commentCreate') this.onClickCommentCreate();
        // });
        // createCommentModal.present();
    }
    playTeacherYoutube() {
        const ID = this.a.getYoutubeID(this.re.teacher.youtube_video_url);
        if (!ID) {
            return this.a.toast('본 강사는 유튜브 동영상을 등록하지 않았습니다.');
        }
        this.urlYoutube = this.domSanitizer.bypassSecurityTrustResourceUrl(this.a.getYoutubeUrl(ID));
        // if (this.a.isCordova) {
        //   this.youtube.openVideo(ID);
        // } else {
        //   this.urlYoutube = this.domSanitizer.bypassSecurityTrustResourceUrl(this.a.getYoutubeUrl(ID));
        // }

    }


}

