import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { TOP_EARNERS } from '../../../../modules/xapi/interfaces';

@Component({
    selector: 'ontue-top-earner-component',
    templateUrl: 'ontue-top-earner.component.html',
    styleUrls: ['ontue-top-earner.component.scss'],
})
export class OntueTopEarnerComponent implements OnInit {


    @Input() topearners: TOP_EARNERS = [];

    constructor(public a: AppService) {

    }

    ngOnInit() {

    }

}



