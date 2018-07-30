import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-reminders-component',
    templateUrl: 'ontue-reminder.component.html',
    styleUrls: ['ontue-reminder.component.scss'],
})
export class OntueReminderComponent {

    constructor(public a: AppService) {

    }
}



