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

    loader = {
        booking: false
    };
    constructor(
        public a: AppService,
        public modal: ModalService
    ) {

        this.today = a.getYmd();

        // this.onClickSelectDate();
        this.onClickSelectDate(1, 1);

    }

    ngOnInit() { }


    loadAdminStatistics() {
        this.loader.booking = true;
        this.a.lms.admin_statistics({
            date_begin: this.stat_date_begin,
            date_end: this.stat_date_end
        }).subscribe(res => {
            console.log('admin statistics: ', res);
            this.stats = res;
            this.loader.booking = false;
        }, e => {
            this.a.toast(e);
            this.loader.booking = false;
        });
    }

    barHeight( no , max = null, div = 1 ) {
        if ( !no || no === 0 ) {
            return '1px';
        }
        if ( no < 0 ) {
            no = Math.abs(no);
        }
        if ( max ) {
            return Math.floor((no / max * 100) / div) + 'px';
        }

        return Math.floor(no / div) + 'px';
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
    classBgColor( n: number ) {
        return 'bg-' + this.classColor(n);
    }

    onClickSelectDate( begin = null, end = null ) {
        const d = new Date();

        if ( begin != null ) {
            const begin_date = new Date( d.getTime() - ( begin * 24 * 60 * 60 * 1000) );
            this.stat_date_begin = parseInt(begin_date.getFullYear() + this.a.add0((begin_date.getMonth() + 1)) + this.a.add0(begin_date.getDate()), 10);
        } else {
            this.stat_date_begin = parseInt(d.getFullYear() + this.a.add0((d.getMonth() + 1)) + this.a.add0(1), 10);
        }

        if ( end != null ) {
            const end_date = new Date( d.getTime() + ( end * 24 * 60 * 60 * 1000) );
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        } else {
            const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            this.stat_date_end = parseInt(d.getFullYear() + this.a.add0((d.getMonth() + 1)) + lastDayOfMonth.getDate(), 10);
        }

        this.loadAdminStatistics();
    }

}



