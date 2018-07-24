import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-student-greeting-list-component',
    templateUrl: 'ontue-student-greeting-list.component.html',
    styleUrls: ['ontue-student-greeting-list.component.scss'],
})
export class OntueStudentGreetingListComponent {

    greetings = null;

    constructor(public a: AppService) {

        a.lms.get_greetings().subscribe( res => {
            console.log('get_greetings: ', res);
            if (res) {
                this.greetings = res;
            }
        }, e => this.a.toast(e));
    }

}



