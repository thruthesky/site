import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ontue-schedule-edit-page',
    templateUrl: 'ontue-schedule-edit.page.html',
    styleUrls: ['ontue-schedule-edit.page.scss']
})
export class OntueScheduleEditPage {

    constructor(
        public a: AppService,
        private route: ActivatedRoute
    ) {

        this.route.queryParams.subscribe(params => {
            console.log(params);
        });
    }
}

