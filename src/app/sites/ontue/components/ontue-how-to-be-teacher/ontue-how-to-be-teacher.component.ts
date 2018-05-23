import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-how-to-be-teacher-component',
    templateUrl: 'ontue-how-to-be-teacher.component.html',
    styleUrls: ['ontue-how-to-be-teacher.component.scss'],
})
export class OntueHowToBeTeacherComponent {


    @Input() no_teachers = [];
    @Input() no_students = [];
    @Input() no_reservations = [];
    @Input() no_pasts = [];

    constructor(public a: AppService) {
    }

}



