import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-my-point-page',
    templateUrl: 'katalkenglish-my-point.page.html',
    styleUrls: ['katalkenglish-my-point.page.scss']
})

export class KatalkEnglishMyPointPage implements OnInit {
    point;
    constructor(
        public a: AppService
    ) {
        this.a.loadMyPoint(p => {
            this.point = p;
        }, 200);
     }

    ngOnInit() { }
}

