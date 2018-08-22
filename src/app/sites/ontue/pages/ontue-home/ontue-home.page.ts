import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { TEACHER_SITE_INFO } from '../../../../modules/xapi/interfaces';
import { ForumService } from '../../../../providers/forum/forum.service';
import { ModalData, ModalService } from '../../../../providers/modal/modal.service';



@Component({
    selector: 'app-page-ontue-home',
    templateUrl: 'ontue-home.page.html',
    styleUrls: ['ontue-home.page.scss'],
})
export class OntueHomePage {

    reminders;

    site_info: TEACHER_SITE_INFO = {
        comment_from_student: <any>{},
        comment_from_teacher: [],
        no_of_past: '0',
        no_of_reservations: '0',
        no_of_student: '0',
        no_of_teacher: '0',
        recent_graded_teachers: [],
        recent_reservations: [],
        topearners: []
    };


    auctions;

    information_list = {
        profile_check: 'Update Profile Information',
        curriculum_vitae_check: 'Update Curriculum Vitae',
        payment_information_check: 'Update Payment Information'
    };
    constructor(
        public a: AppService,
        public forum: ForumService,
        public modal: ModalService
    ) {
        this.a.lms.get_teacher_site_info().subscribe(res => {
            // console.log('res', res);
            this.site_info = res['site_info'];
        }, () => {
        });

        forum.loadPosts({slug: 'teacher_reminders', page: 1, per_page: 5}).subscribe(re => this.reminders = re);


        this.checkTeacherInformation();
    }


    checkTeacherInformation() {
        if ( this.a.isLogout || this.a.isStudent || this.a.isSuperManager || this.a.isManager ) {
            return;
        }
        this.a.lms.checkTeacherInformation().subscribe( res => {
            // console.log('checkTeacherInformation::', res);
            if ( res ) {
                let content = '';
                const keys = Object.keys(res);
                keys.forEach( v => {
                    let li = '';
                    res[v].forEach( i => {
                        li += `<li>${i}</li>`;
                    });
                    if ( li ) {
                        content += `
                        <div>${ this.information_list[v] }</div>
                        <ul>
                            ${li}
                        </ul>
                        `;
                    }
                });

                console.log('checkTeacherInformation::res::', content);

                if ( content ) {
                    const data: ModalData = {
                        title: 'Required Information Missing',
                        content: content,
                        ok: this.a.t('OK')
                    };
                    this.modal.alert(data).subscribe(result => {
                        if (result) {}
                    });
                }
            }

        }, e => {
            // do nothing...
        });
    }

}



