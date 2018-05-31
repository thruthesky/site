import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../../../providers/app.service';



@Component({
    selector: 'katalkenglish-intro',
    templateUrl: 'katalkenglish-intro.component.html',
    styleUrls: ['katalkenglish-intro.component.scss'],
})
export class KatalkEnglishIntroComponent {



    constructor(public a: AppService) {

    }


}


