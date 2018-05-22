import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
    selector: 'app-page-ontue-home',
    templateUrl: 'ontue-home.page.html',
    styleUrls: ['ontue-home.page.scss'],
})
export class OntueHomePage {


    site_info = {
        comment_from_student: [],
        comment_from_teacher: [],
        no_of_past: 0,
        no_of_reservations: 0,
        no_of_student: 0,
        no_of_teacher: 0,
        recent_graded_teachers: [],
        recent_reservations: []
    };


    constructor(public a: AppService) {
        this.a.lms.get_teacher_site_info().subscribe(res => {
            this.site_info = res['site_info'];
        }, () => {
        });

    }
}


