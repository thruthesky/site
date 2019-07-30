import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../providers/app.service';
import { TEACHER_LIST_INFO } from '../../../modules/xapi/interfaces';

@Component({
    selector: 'app-teacher-list-profile-component',
    templateUrl: 'teacher-list-profile.component.html',
    styleUrls: ['teacher-list-profile.component.scss']
})

export class TeacherListProfileComponent implements OnInit {
    @Input() teacher: TEACHER_LIST_INFO;
    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }
}

