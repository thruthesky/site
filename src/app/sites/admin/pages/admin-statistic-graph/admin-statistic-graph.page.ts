import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ModalService } from '../../../../providers/modal/modal.service';

@Component({
    selector: 'admin-statistic-graph-page',
    templateUrl: 'admin-statistic-graph.page.html',
    styleUrls: ['admin-statistic-graph.page.scss']
})

export class AdminStatisticGraphPage implements OnInit {

    stat_date_begin = 0;
    stat_date_end = 0;
    stats = null;
    today = null;
    constructor(
        public a: AppService,
        public modal: ModalService
    ) {

        this.today = a.getYmd();

        const d = new Date();
        this.stat_date_begin = parseInt(d.getFullYear() + a.add0((d.getMonth() + 1)) + a.add0(1), 10);
        const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        this.stat_date_end = parseInt(d.getFullYear() + a.add0((d.getMonth() + 1)) + lastDayOfMonth.getDate(), 10);
        this.loadAdminStatistics();
    }

    ngOnInit() { }


    loadAdminStatistics() {

        this.a.lms.admin_statistics({
            date_begin: this.stat_date_begin,
            date_end: this.stat_date_end
        }).subscribe(res => {
            // console.log('admin statistics: ', res);
            this.stats = res;
        }, e => this.a.toast(e));
    }


    barHeight( no , max = null ) {
        if ( !no || no === 0 ) {
            return '1px';
        }
        if ( no < 0 ) {
            no = Math.abs(no);
        }
        if ( max ) {
            return Math.floor(no / max * 100) + 'px';
        }

        return no + 'px';
    }

    formatDate(date) {
        return date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8);
    }

    classColor( n: number ) {
        if ( !n ) {
            return '';
        } else if ( n < 50) {
            return 'darkred';
        } else if ( n < 70) {
            return 'green';
        } else if ( n <= 100) {
            return 'blue';
        }
    }
}



