import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-home-reminders',
    templateUrl: 'katalkenglish-home-reminders.component.html',
    styleUrls: ['katalkenglish-home-reminders.component.scss'],
})
export class KatalkEnglishHomeRemindersComponent implements OnInit, OnChanges {
    @Input() reminders;
    show = false;
    constructor(
        public a: AppService
    ) {

    }

    ngOnInit() {
    }
    ngOnChanges() {
        if ( this.reminders ) {
            setTimeout(() => {
                this.show = true;
            }, 5000);
        }
    }
}


