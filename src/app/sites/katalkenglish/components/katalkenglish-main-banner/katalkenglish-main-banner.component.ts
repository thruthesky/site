import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'katalkenglish-main-banner',
    templateUrl: 'katalkenglish-main-banner.component.html',
    styleUrls: ['katalkenglish-main-banner.component.scss'],
})
export class KatalkEnglishMainBannerComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * if it is set to -1, it's not debugging.
     * -1 로 지정하면 디버깅 하지 않음.
     * When you debug a page, set it to animation number from 0.
     * 배너 애니메이션을 디버깅하고자 한다면 해당 배너 번호를 입력하면 그 배너만 표시 됨.
     * 예) 3 을 지정하면 4번째 배너를 볼 수 있다.
     */
    debugging = -1;

    beginAni = false;
    no = 0;
    intervals = [4000, 5000, 6000, 12000];
    timerID;
    pageDestroyed = false;
    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => this.debug(), 100);
        setTimeout(() => this.begin(), 3000); // real
    }
    ngOnDestroy() {
        if (this.timerID) {
            clearTimeout(this.timerID);
            // console.log('timer cleared: ', this.timerID);
        }
        this.pageDestroyed = true; // to stop the animation that lives on closure.
    }

    debug() {
        if (this.debugging === -1) {
            return;
        }
        this.no = this.debugging;
        this.beginAni = true;
    }


    begin() {
        if (this.debugging !== -1) {
            return;
        }
        this.beginAni = true;
        this.dropDown();
    }

    dropDown(timeout = 1000) {
        setTimeout(() => this.animate(), timeout);
    }

    animate() {
        if (this.pageDestroyed) { // to stop the animation that lives on closure.
            // console.log("Page has destroyed already. no more banner rotation");
            return;
        }
        if (this.debugging !== -1) {
            return;
        }
        // console.log("animate: ", this.no);
        if (this.no >= this.intervals.length) {
            this.no = 0;
        }
        this.timerID = setTimeout(() => {
            this.no++;
            this.animate();
        }, this.intervals[this.no]);
    }
}



