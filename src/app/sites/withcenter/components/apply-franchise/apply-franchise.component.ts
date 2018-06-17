import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';
import { AppService } from '../../../../providers/app.service';
import { ModalService } from '../../../../providers/modal/modal.service';


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
        public a: AppService,
        public modal: ModalService
    ) { }

    ngOnInit() { }

    onSubmitApply(event: Event) {
        event.preventDefault();
        this.a.lms.branch_register(this.form).subscribe(re => {

            this.modal.alert({ content: '<p>축하합니다.</p><p>창업을 완료하였습니다.</p>' }).subscribe(() => {
                this.a.openAdminPage(re['user']['manager'], re['session_id']);
            }, e => {
                this.a.openAdminPage(re['user']['manager'], re['session_id']);
            });

            // console.log('branch_register: ', re);

            // this.a.user.login(this.form.user_email, this.form.user_pass).subscribe(login => {
            //     console.log('login: ', login);
            //     console.log('email: ', this.a.user.email);
            //     this.modal.alert({ content: '<p>축하합니다.</p><p>창업을 완료하였습니다.</p>' }).subscribe(() => {
            //         this.a.openAdminPage(re['user']['manager']);
            //     }, e => {
            //         this.a.openAdminPage(re['user']['manager']);
            //     });

            // }, e => this.a.toast(e));

        }, e => this.a.toast(e));
        return false;
    }
}

