import { Component, Input, AfterViewInit } from '@angular/core';
import { AppService } from '../../../providers/app.service';
import { SCHEDULE_TABLE } from '../../../modules/xapi/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ForumService } from '../../../providers/forum/forum.service.module';
import { ModalService } from '../../../providers/modal/modal.service';

@Component({
    selector: 'schedule-table-profile-component',
    templateUrl: './schedule-table-profile.component.html',
    styleUrls: ['./schedule-table-profile.component.scss']
})
export class ScheduleTableProfileComponent implements AfterViewInit {
    @Input() isSingleTeacher = false;
    @Input() isLoadComplete = true;
    @Input() re: SCHEDULE_TABLE = null;
    @Input() teacherName = null;

    myClassSoftware = '';

    /**
     * Teacher's youtube URL with dom sanitizing.
     */
    urlYoutube = null;

    constructor(
        public domSanitizer: DomSanitizer,
        public readonly a: AppService,
        public forum: ForumService,
        public modal: ModalService,
    ) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.myClassSoftware = this.a.lmsInfo('user.class_software');
            console.log('myClassSoftware: ', this.myClassSoftware);
        }, 300);
    }

    /**
     * @todo remove this method. It is not used.
     */
    onClickAddKakao() {
        const url = this.re.teacher.kakao_qrmark_string;
        // console.log("kakao::url:: ", url);
        if (url) {
            window.open(url, '_blank');
        } else {
            this.a.toast(this.a.t('TEACHER_DOES_NOT_HAVE_KAKAOTALK_ID'));
        }
    }

    /**
     *
     * @todo put each kakaotalk qr string
     */
    onClickAddMessenger() {
        this.a.addMessenger({
            class_software: this.myClassSoftware,
            class_software_id: this.re.teacher[this.myClassSoftware],
            url: this.re.teacher.kakao_qrmark_string
        });
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


    openModalPromo() {
        this.forum.getPostBySlug('withcenter-teacher-75000-promo', this.a.language.getLanguage()).subscribe((posts: any) => {
            // console.log('posts', posts);
            if (posts && posts.length) {
                this.modal.alert({ content: posts[0].content.rendered });
            } else {
                this.modal.alert({ content: 'Ooh! No information about this promo. Please inform this to Admin immediately.' });
            }
        });
    }


}

