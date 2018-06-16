import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';


interface Form {
    user_email: string;
    user_pass: string;
    name: string;
    phone_number: string;
    sub_domain: string;
    root_domain: string;
}
@Component({
    selector: 'apply-franchise-component',
    templateUrl: 'apply-franchise.component.html',
    styleUrls: ['apply-franchise.component.scss']
})

export class ApplyFranchiseComponent implements OnInit {

    show: WithcenterShow = <any>{};
    form = <Form>{};

    constructor() { }

    ngOnInit() { }

    onSubmitApply(event: Event) {
        event.preventDefault();

        return false;
    }
}

