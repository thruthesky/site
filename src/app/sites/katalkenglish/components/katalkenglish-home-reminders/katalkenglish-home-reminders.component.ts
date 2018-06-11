import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-home-reminders',
    templateUrl: 'katalkenglish-home-reminders.component.html',
    styleUrls: ['katalkenglish-home-reminders.component.scss'],
})
export class KatalkEnglishHomeRemindersComponent implements OnInit {
    @Input() reminders;
    constructor(
        public a: AppService
    ) {

    }

    ngOnInit() {
    }
}


