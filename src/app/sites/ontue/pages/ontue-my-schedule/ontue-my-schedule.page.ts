import {Component} from '@angular/core';
import {AppService} from '../../../../providers/app.service';

@Component({
    selector: 'ontue-my-schedule-page',
    templateUrl: 'ontue-my-schedule.page.html',
    styleUrls: ['ontue-my-schedule.page.scss']
})
export class OntueMySchedulePage {

    constructor(
        public a: AppService
    ) {
    }
}

