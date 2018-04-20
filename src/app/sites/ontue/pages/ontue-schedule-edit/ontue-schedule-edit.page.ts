import {Component} from '@angular/core';
import {AppService} from '../../../../providers/app.service';

@Component({
    selector: 'ontue-schedule-edit-page',
    templateUrl: 'ontue-schedule-edit.page.html',
    styleUrls: ['ontue-schedule-edit.page.scss']
})
export class OntueScheduleEditPage {

    constructor(
        public a: AppService
    ) {
    }
}

