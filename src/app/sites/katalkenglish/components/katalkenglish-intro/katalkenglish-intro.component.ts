import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
// import { Slides } from 'ionic/angular';



@Component({
    selector: 'katalkenglish-intro',
    templateUrl: 'katalkenglish-intro.component.html',
    styleUrls: ['katalkenglish-intro.component.scss'],
})
export class KatalkEnglishIntroComponent {

    // @ViewChild(Slides) slides: Slides;
    on = 0;

    show_detail = false;

    constructor(public a: AppService) {

    }

    slideChanged() {
        // this.show_detail = false;
        // // let currentIndex = this.slides.getActiveIndex();
        // // console.log('Current index is', currentIndex);
        // // console.log(this.slides.realIndex);
        // // if ( currentIndex > 2 ) currentIndex = 2; // bug
        // this.on = this.slides.realIndex;
    }

}


