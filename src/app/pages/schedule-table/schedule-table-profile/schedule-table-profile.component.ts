import { Component, Input } from '@angular/core';
import { AppService } from '../../../providers/app.service';
import { SCHEDULE_TABLE } from '../../../modules/xapi/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ForumService } from '../../../providers/forum.service';
import { ModalService } from '../../../providers/modal/modal.service';

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
        public readonly a: AppService,
        public forum: ForumService,
        public modal: ModalService,
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
        this.forum.getPostBySlug('withcenter-teacher-75000-promo', this.a.language.getLanguage()).subscribe(posts => {
            console.log('posts', posts);
            if (posts) {
                this.modal.alert({ content: posts[0].content.rendered });
            }
        });
    }


}

