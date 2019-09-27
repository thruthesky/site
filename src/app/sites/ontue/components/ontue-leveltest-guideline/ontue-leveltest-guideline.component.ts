import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ontue-leveltest-guideline-component',
    templateUrl: 'ontue-leveltest-guideline.component.html',
    styleUrls: ['ontue-leveltest-guideline.component.scss'],
})
export class OntueLeveltestGuidelineComponent {


    view = 0;
    selectedVideo = null;
    youtube = ['www.youtube.com/watch?v=vk3drk7giYM', 'www.youtube.com/watch?v=I7Jol4-xGpA'];
    urlYoutube = null;

    constructor(public a: AppService,
                public domSanitizer: DomSanitizer) {
    }


    playTeacherYoutube(video = 0) {
        const url = this.a.getYoutubeUrl(this.a.getYoutubeID(this.youtube[video]));
        this.urlYoutube = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
        this.view = 2;
        this.selectedVideo = video;
    }

}



