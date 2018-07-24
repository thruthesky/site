import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-student-auction-list-component',
    templateUrl: 'ontue-student-auction-list.component.html',
    styleUrls: ['ontue-student-auction-list.component.scss'],
})
export class OntueStudentAuctionListComponent {

    auctions = null;

    constructor(public a: AppService) {

        a.lms.get_auctions().subscribe( res => {
            console.log('get_auctions: ', res);
            if (res) {
                this.auctions = res;
            }
        }, e => this.a.toast(e));
    }

}



