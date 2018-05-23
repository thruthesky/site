import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'ontue-grade-condition-page',
    templateUrl: 'ontue-grade-condition.page.html',
    styleUrls: ['ontue-grade-condition.page.scss']
})

export class OntueGradeConditionPage {
    grade = 1;

    constructor(public a: AppService,
                private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            console.log('queryParams', params);
            if (params && params.grade) {
                this.grade = params.grade;
            }
        });

    }


    next() {
        if (this.grade === 3) {
            this.grade = 1;
        } else {
            this.grade++;
        }
    }

    prev() {
        if (this.grade === 1) {
            this.grade = 3;
        } else {
            this.grade--;
        }
    }


}
