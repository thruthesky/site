import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-graded-latest-list-component',
    templateUrl: 'ontue-graded-latest-list.component.html',
    styleUrls: ['ontue-graded-latest-list.component.scss'],
})
export class OntueGradedLatestListComponent {

    @Input() teachers = [];
    constructor(public a: AppService) {
    }

}



