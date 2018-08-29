import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-curriculum-page',
    templateUrl: 'ontue-curriculum.page.html',
    styleUrls: ['ontue-curriculum.page.scss']
})

export class OntueCurriculumPage implements OnInit {
    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }
}



