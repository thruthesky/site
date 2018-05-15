import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-welcome-page',
    templateUrl: 'katalkenglish-welcome.page.html',
    styleUrls: ['katalkenglish-welcome.page.scss']
})
export class KatalkEnglishWelcomePage {

    date_today;
    today = new Date();
    constructor(
        public a: AppService
    ) {

    }


}
