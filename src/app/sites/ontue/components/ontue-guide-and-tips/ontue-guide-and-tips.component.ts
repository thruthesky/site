import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-guide-and-tips-component',
    templateUrl: 'ontue-guide-and-tips.component.html',
    styleUrls: ['ontue-guide-and-tips.component.scss'],
})
export class OntueGuideAndTipsComponent {
    tipsAccordion = false;
    gradedTeachersAccordion = false;
    guidelinesAccordion = false;
    badStudentAccordion = false;
    constructor(public a: AppService) {
    }


    accord = {
        on1: true,
        on2: true,
        on3: true,
        on4: true,

    };

}



