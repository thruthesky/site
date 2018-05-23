import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-statistics-component',
    templateUrl: 'ontue-statistics.component.html',
    styleUrls: ['ontue-statistics.component.scss'],
})
export class OntueStatisticsComponent {


    @Input() no_teachers = [];
    @Input() no_students = [];
    @Input() no_reservations = [];
    @Input() no_pasts = [];

    constructor(public a: AppService) {
    }

}



