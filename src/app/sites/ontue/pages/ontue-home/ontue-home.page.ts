import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { TEACHER_SITE_INFO } from '../../../../modules/xapi/interfaces';



@Component({
    selector: 'app-page-ontue-home',
    templateUrl: 'ontue-home.page.html',
    styleUrls: ['ontue-home.page.scss'],
})
export class OntueHomePage {


    site_info: TEACHER_SITE_INFO = {
        comment_from_student: <any>{},
        comment_from_teacher: [],
        no_of_past: '0',
        no_of_reservations: '0',
        no_of_student: '0',
        no_of_teacher: '0',
        recent_graded_teachers: [],
        recent_reservations: [],
        topearner: <any> {}
    };


    constructor(public a: AppService) {
        this.a.lms.get_teacher_site_info().subscribe(res => {
            // console.log('res', res);
            this.site_info = res['site_info'];
        }, () => {
        });

    }
}



