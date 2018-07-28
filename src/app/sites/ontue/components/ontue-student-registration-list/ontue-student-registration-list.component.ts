import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { STUDENTS } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'ontue-student-registration-list-component',
    templateUrl: 'ontue-student-registration-list.component.html',
    styleUrls: ['ontue-student-registration-list.component.scss'],
})
export class OntueStudentRegistrationListComponent {

    students: STUDENTS = null;

    constructor(public a: AppService) {
        this.a.lms.get_latest_student_register({limit: 5}).subscribe( re => {
            console.log('get_latest_student_register', re);
            this.students = re['students'];
        });
    }
}



