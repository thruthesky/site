import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-grading-system-component',
    templateUrl: 'ontue-grading-system.component.html',
    styleUrls: ['ontue-grading-system.component.scss'],
})
export class OntueGradingSystemComponent {




    constructor(public a: AppService) {
    }

}



