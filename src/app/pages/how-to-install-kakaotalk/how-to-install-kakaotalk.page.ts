import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'how-to-install-kakaotalk-page',
    templateUrl: 'how-to-install-kakaotalk.page.html',
    styleUrls: ['how-to-install-kakaotalk.page.scss'],
})
export class HowToInstallKakaotalkPage {

    constructor(
        public a: AppService
    ) { }


}
