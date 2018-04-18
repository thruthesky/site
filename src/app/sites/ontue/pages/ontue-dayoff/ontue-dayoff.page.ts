import { Component } from '@angular/core';
import {AppService} from '../../../../providers/app.service';

@Component({
    selector: 'ontue-dayoff-page',
    templateUrl: 'ontue-dayoff.page.html',
    styleUrls: ['ontue-dayoff.page.scss']
})
export class OntueDayoffPage {


    dayoffs = [];
    showForm = false;


    today = new Date();
    showLoader = false;

    _date = '';
    constructor(
        public a: AppService
    ) {

        this.date = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth() + 1) + '-' + this.a.add0(this.today.getDate());

        this.loadDayoffs();

    }

    set date( date ) {
        const d = new Date(date);
        this._date = d.getFullYear() + '-' + this.a.add0((d.getMonth() + 1)) + '-' + this.a.add0(d.getDate());
    }
    get date() {
        return this._date;
    }

    loadDayoffs() {
        this.showLoader = true;
        this.a.lms.get_dayoffs().subscribe(re => {
            this.dayoffs = re['dayoffs'];
            this.showLoader = false;
        }, e => {
            this.a.toast(e);
            this.showLoader = false;
        });
    }

    onClickCreateDayoff() {
        this.showForm = true;
    }

    onClickSubmit() {
        const date = this.date.replace(/\-/g, '');
        this.a.lms.set_dayoff(date).subscribe(re => {
            // console.log(re);
            this.loadDayoffs();
        }, e => this.a.toast(e));
    }

    onClickDeleteDate(dayoff) {
        this.showLoader = true;
        this.a.lms.delete_dayoff(dayoff.date).subscribe(re => {
            // console.log(re);
            // this.loadDayoffs();
            this.showLoader = false;
            const idx = re['idx_dayoff'];
            this.dayoffs = this.dayoffs.filter(off => off['idx'] !== idx);
        }, e => {
            this.showLoader = false;
            this.a.toast(e);
        });
    }

    preDate(date) {
        if (!date) {
            return '';
        }
        const y = date.slice(0, 4);
        const m = date.slice(4, 6);
        const d = date.slice(6, 9);
        return `${y}-${m}-${d}`;
    }


}

