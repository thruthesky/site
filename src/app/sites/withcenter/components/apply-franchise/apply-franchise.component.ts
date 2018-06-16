import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';
import { AppService } from '../../../../providers/app.service';


interface Form {
    user_email: string;
    user_pass: string;
    name: string;
    phone_number: string;
    domain: string;
}
@Component({
    selector: 'apply-franchise-component',
    templateUrl: 'apply-franchise.component.html',
    styleUrls: ['apply-franchise.component.scss']
})

export class ApplyFranchiseComponent implements OnInit {

    show: WithcenterShow = <any>{};
    form = <Form>{};

    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }

    onSubmitApply(event: Event) {
        event.preventDefault();


        this.a.lms.branch_register(this.form).subscribe(re => {
            console.log('branch_register: ', re);
        }, e => this.a.toast(e));
        return false;
    }
}

