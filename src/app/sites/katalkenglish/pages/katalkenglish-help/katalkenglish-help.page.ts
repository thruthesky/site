import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-help-page',
    templateUrl: 'katalkenglish-help.page.html',
    styleUrls: ['katalkenglish-help.page.scss'],
})
export class KatalkEnglishHelpPage implements OnDestroy {
    navigationSubscription;

    accord = {
        on1: false,
        on2: false,
        on3: false,
        on4: false,
        on5: false,
        on6: false,
        on7: false,
        on8: false,
        on9: false,
        on10: false,
        on11: false,
        on12: false
    };

    constructor(public a: AppService) {
        // console.log(`HelpPage:constructor()`);

    }

    ngOnDestroy() {
        // To avoid memory leaks.
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}




