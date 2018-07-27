import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { AUCTION } from '../../modules/xapi/lms.service';

@Component({
    selector: 'auction-list-page',
    templateUrl: 'auction-list.page.html',
    styleUrls: ['auction-list.page.scss']
})
export class AuctionListPage implements OnInit {
    auctions: Array<AUCTION> = [];
    constructor(
        public a: AppService
    ) {
        a.lms.get_auctions({
            tz_offset: a.lms.getUserLocalTimezoneOffset(),
            page: 1,
            limit: 10
        }).subscribe(res => {
            console.log('get_auctions: ', res);
            if (res) {
                this.auctions = res;
            }
        }, e => this.a.toast(e));

    }

    ngOnInit() { }
    onSubmitApplication(event: Event, auction) {
        event.preventDefault();
        this.a.lms.apply_auction({
            ID: auction.ID,
            message: auction['message']
        }).subscribe(res => {
            console.log('apply_auction: ', res);
        }, e => this.a.toast(e));
        return false;
    }
}



