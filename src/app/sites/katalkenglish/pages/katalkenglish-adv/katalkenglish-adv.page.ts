
import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-adv-page',
    templateUrl: 'katalkenglish-adv.page.html',
    styleUrls: ['katalkenglish-adv.page.scss']
})
export class KatalkEnglishAdvPage {
    constructor(
        public a: AppService
    ) {

    }
}

