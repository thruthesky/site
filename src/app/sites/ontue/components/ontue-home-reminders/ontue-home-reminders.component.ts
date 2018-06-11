import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-home-reminders',
    templateUrl: 'ontue-home-reminders.component.html',
    styleUrls: ['ontue-home-reminders.component.scss'],
})
export class OntueHomeRemindersComponent implements OnInit {
    @Input() reminders;
    constructor(
        public a: AppService
    ) {

    }

    ngOnInit() {
    }
}



