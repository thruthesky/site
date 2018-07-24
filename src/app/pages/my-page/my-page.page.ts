
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MYPAGE } from '../../modules/xapi/lms.service';
import { TEACHER_LIST_INFO } from '../../modules/xapi/interfaces';


@Component({
    selector: 'my-page-page',
    templateUrl: 'my-page.page.html',
    styleUrls: ['my-page.page.scss'],
})
export class MyPagePage implements OnInit {

    loader = {
        mypage: false,
        greeting: false,
        auction: false
    };
    show = {
        auction: false,
        greetingSaved: false,
        auctionSaved: false
    };
    mypage: MYPAGE = <any>{
    };
    teachers: Array<TEACHER_LIST_INFO> = [];

    constructor(
        public a: AppService
    ) {
        // console.log(`NotFoundPage::constructor()`);

        this.mypage.auction = this.defaultAuction;

        this.loader.mypage = true;
        a.lms.mypage().subscribe(re => {
            this.loader.mypage = false;
            this.mypage = re;
            console.log('mypage: ', this.mypage);
            if (this.mypage.auction) {
                this.show.auction = true;
            }
        }, e => a.toast(e));

        this.loadTeachers();
    }

    ngOnInit() {

    }

    get defaultAuction() {
        return {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            hour: 0,
            minute: 0,
            duration: 0,
            point: 0,
            comment: ''
        };
    }

    loadTeachers() {
        const opt = {
            search: 'recommended',
            page_no: 1,
            limit: 100
        };
        this.a.lms.teacher_list(opt).subscribe(re => {
            this.teachers = re.teachers;
        }, () => { });
    }

    onSubmitGreeting(event: Event) {
        event.preventDefault();

        this.loader.greeting = true;
        this.a.lms.greeting_update(this.mypage.greeting).subscribe(re => {
            console.log('re: ', re);
            this.loader.greeting = false;
            this.show.greetingSaved = true;
            setTimeout(() => this.show.greetingSaved = false, 5000);
        }, e => this.a.toast(e));

        return false;
    }
    onSubmitAuction(event: Event) {
        event.preventDefault();
        this.loader.auction = true;
        this.a.lms.auction_update(this.mypage.auction).subscribe(re => {
            console.log('re: ', re);
            this.loader.auction = false;
            this.show.auctionSaved = true;
            setTimeout(() => this.show.auctionSaved = false, 5000);
        }, e => this.a.toast(e));
        return false;
    }
    onDeleteAuction() {
        this.loader.auction = true;
        this.a.lms.auction_delete().subscribe(re => {
            console.log('re: ', re);
            this.loader.auction = false;
            this.mypage.auction = this.defaultAuction;
            this.show.auction = false;
        }, e => this.a.toast(e));
    }
}

