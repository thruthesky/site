import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';
import { AppService } from '../../../../providers/app.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { WithcenterTextService } from '../../withcenter-text.service';


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

    agree = false;

    constructor(
        public a: AppService,
        public modal: ModalService,
        public t: WithcenterTextService
    ) { }

    ngOnInit() { }

    onSubmitApply(event: Event) {
        event.preventDefault();
        if ( ! this.agree ) {
            this.modal.alert({content: this.t.ln.agree, ok: this.t.ln.ok });
            return;
        }
        this.a.lms.branch_register(this.form).subscribe(re => {
            this.modal.alert({ content: this.t.ln.registered, ok: this.t.ln.ok }).subscribe(() => {
                this.a.openAdminPage(re['user']['manager'], re['session_id']);
            }, e => {
                this.a.openAdminPage(re['user']['manager'], re['session_id']);
            });
        }, e => this.a.toast(e));
        return false;
    }
    onClickShowTermsAndConditions() {
        console.log(this.t.ln);
        this.modal.alert({content: '<pre>' + this.t.ln.terms_and_conditions + '<pre>' });
    }
}

