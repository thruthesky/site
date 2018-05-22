import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'ontue-activity-log-component',
    templateUrl: 'ontue-activity-log.component.html',
    styleUrls: ['ontue-activity-log.component.scss'],
})
export class OntueActivityLogComponent {

    actv = {
        visit: ' visit the site.',
        login: ' has log in.',
        'open-register': ' visit the registration.',
        register: ' has registered.',
        'view-profile': ' has view the profile of ',
        'update-profile': ' update profile.',
        reserve: ' made reservation to ',
        cancel: ' cancel reservation ',
        payment: ' trying to pay ',
        evaluate: ' evaluate to student ',
        comment: ' comment to teacher'
    };

    constructor(public a: AppService) {
    }

}



