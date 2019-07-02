import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ModalData } from '../../../../providers/modal/modal.service';

@Component({
    selector: 'katalkenglish-menu-page',
    templateUrl: 'katalkenglish-menu.page.html',
    styleUrls: ['katalkenglish-menu.page.scss']
})
export class KatalkEnglishMenuPage {

    date_today;
    today = new Date();
    constructor(
        public a: AppService
    ) {

        this.date_today = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth() + 1) + '-' + this.a.add0(this.today.getDate());

    }
}




