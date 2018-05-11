import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'how-to-get-kakaotalk-id-page',
    templateUrl: 'how-to-get-kakaotalk-id.page.html',
    styleUrls: ['how-to-get-kakaotalk-id.page.scss'],
})
export class HowToGetKakaotalkIdPage {

    constructor(
        public a: AppService
    ) { }


}
