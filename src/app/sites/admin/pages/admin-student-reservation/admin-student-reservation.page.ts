import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-student-reservation-page',
    templateUrl: 'admin-student-reservation.page.html',
    styleUrls: ['admin-student-reservation.page.scss']
})
export class AdminStudentReservationPage implements OnInit {

    minCount = 100; // this is the minimum reservation to search in countStudentReservation
    point = 50;
    reservations_count: Array<any> = [];
    showReservationCount = false;

    loader = {
        reservation: false
    };

    constructor(
        public a: AppService,
        public active: ActivatedRoute,
    ) {
        this.getStudentReservationCount();
    }

    ngOnInit() { }


    getStudentReservationCount(event = null) {
        if (event) {
            event.preventDefault();
        }
        if ( this.loader.reservation ) {
            return;
        }
        this.loader.reservation = true;
        this.showReservationCount = true;
        this.a.lms.admin_count_student_reservation({minimum: this.minCount, point: this.point}).subscribe( re => {
            console.log(re);
            this.reservations_count = re;
            this.loader.reservation = false;
        }, e => {
            this.a.toast(e);
            this.loader.reservation = false;
        });
    }



}



