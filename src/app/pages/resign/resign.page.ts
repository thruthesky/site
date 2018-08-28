
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ModalService } from '../../providers/modal/modal.service';


@Component({
    selector: 'resign-page',
    templateUrl: 'resign.page.html',
    styleUrls: ['resign.page.scss'],
})
export class ResignPage implements OnInit {

    constructor(
        public a: AppService,
        public modal: ModalService
    ) { }

    ngOnInit() {
    }
    onClickResign() {
        this.modal.confirm({
            title: this.a.t('RESIGN_CONFIRM_TITLE'),
            content: this.a.t('RESIGN_CONFIRM_CONTENT'),
            yes: this.a.t('YES'),
            no: this.a.t('NO')
        }).subscribe(re => {
            // console.log('confirm re: ', re);
            if (re) {
                this.a.lms.resign().subscribe(res => {
                    console.log('resign: ', res);
                    this.a.logout();
                    this.modal.alert({
                        content: this.a.t('RESIGNED_ALERT_CONTENT')
                    });
                    this.a.openHome();
                }, e => this.a.toast(e));
            }
        });
    }
}
