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


        let offset = new Date().getTimezoneOffset();
        offset = (offset / 60) * -1;
        a.lms.get_auctions(offset).subscribe( res => {
            console.log('get_auctions: ', res);
            if (res) {
                this.auctions = res;
            }
        }, e => this.a.toast(e));


    }

}



