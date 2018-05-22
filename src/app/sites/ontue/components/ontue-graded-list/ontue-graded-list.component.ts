import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-graded-list-component',
    templateUrl: 'ontue-graded-list.component.html',
    styleUrls: ['ontue-graded-list.component.scss'],
})
export class OntueGradedListComponent {

    @Input() teachers = [];
    constructor(public a: AppService) {
    }

}



