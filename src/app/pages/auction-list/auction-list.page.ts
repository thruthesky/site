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

    pageOption = {
        limitPerPage: 10,
        currentPage: 1,
        limitPerNavigation: 4,
        totalRecord: 0
    };


    days = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
    shortDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

    showLoader = false;

    constructor(
        public a: AppService
    ) {
        this.showLoader = true;
        a.lms.get_auctions({
            tz_offset: a.lms.getUserLocalTimezoneOffset(),
            limit: this.pageOption['limitPerPage'],
            page: this.pageOption['currentPage']
        }).subscribe(res => {
            console.log('get_auctions: ', res);
            if (res) {
                this.pageOption.currentPage = res['page'];
                this.pageOption.limitPerPage = res['limit'];
                this.pageOption.totalRecord = res['total'];
                this.auctions = res['auction'];
            }
            this.showLoader = false;
        }, e => {
            this.a.toast(e);
            this.showLoader = false;
        });

    }

    ngOnInit() { }
    onSubmitApplication(event: Event, auction) {
        event.preventDefault();
        if ( auction['applying'] ) {
            return;
        }

        if (!auction['message'] || auction['message'].length < 10) {
            this.a.toast('Message is too short...');
            return;
        }
        auction['applying'] = true;
        this.a.lms.apply_auction({
            ID: auction.ID,
            message: auction['message']
        }).subscribe(res => {
            console.log('apply_auction: ', res);
            auction['applying'] = false;
            auction['showMessageForm'] = false;
            this.a.toast('Message Sent...');
        }, e => {
            this.a.toast(e);
            auction['applying'] = false;
        });
        return false;
    }


    showDateSelected( auction ) {
        // console.log(auction);

        const countDays = this.countDays(auction);
        // console.log(countDays);
        if ( countDays === 7) {
            return 'day';
        } else if ( countDays === 5 && !auction['sunday'] && !auction['saturday'] ) {
            return 'M~F';
        } else if (countDays === 3 && auction['monday'] && auction['wednesday'] && auction['friday']) {
            return 'MWF';
        } else if (countDays === 2 && auction['tuesday'] && auction['thursday']) {
            return 'T,TH';
        } else if (countDays === 1) {
            let day = '';
            this.days.forEach( (v, i) => {
                if (auction[v] && auction[v] === 'Y') {
                    day = this.days[i];
                }
            });
            return day;
        } else {
            const d = [];
            this.days.forEach( (v, i) => {
                if ( auction[v] && auction[v] === 'Y'  ) {
                    d.push(this.shortDays[i]);
                }
            });
            return d.join(',');
        }
    }

    countDays(auction) {
        let cnt = 0;
        this.days.forEach( v => {
            if ( auction[v] && auction[v] === 'Y'  ) {
                cnt++;
            }
        });
        return cnt;
    }
}



