import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'teacher-reminders-component',
    templateUrl: 'ontue-reminder.component.html',
    styleUrls: ['ontue-reminder.component.scss'],
})
export class OntueReminderComponent {

    constructor(public a: AppService) {
    }

    onClickSteps() {
        document.querySelector('#teacher-steps').scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}



