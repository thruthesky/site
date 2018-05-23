import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-reservation-latest-list-component',
    templateUrl: 'ontue-reservation-latest-list.component.html',
    styleUrls: ['ontue-reservation-latest-list.component.scss'],
})
export class OntueReservationLatestListComponent {

    @Input() reservations = [];
    constructor(public a: AppService) {
    }
    getLastTwo(text) {
        return text.slice(2, 5);
    }

    getFirstTwo(text) {
        return text.slice(0, 2);
    }
}



