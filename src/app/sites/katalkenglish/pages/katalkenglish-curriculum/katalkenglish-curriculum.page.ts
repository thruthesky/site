import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-curriculum-page',
    templateUrl: 'katalkenglish-curriculum.page.html',
    styleUrls: ['katalkenglish-curriculum.page.scss']
})

export class KatalkEnglishCurriculumPage  {
    point;
    constructor(
        public a: AppService
    ) {

        console.log('KatalkEnglishCurriculumPage');
        this.a.loadMyPoint(p => {
            this.point = p;
        }, 200);
     }

}

