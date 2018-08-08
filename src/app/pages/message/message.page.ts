import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MessageSendModalService } from '../../providers/message-send-modal/message-send-modal.service';
import { ModalData, ModalService } from '../../providers/modal/modal.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';


@Component({
    selector: 'message-page',
    templateUrl: 'message.page.html',
    styleUrls: ['message.page.scss'],
})
export class MessagePage {

    data = null;
    page_no = 1;
    message_count;
    limit = 10;
    box = 'inbox';
    filterMessage = '';

    loading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        public a: AppService,
        public modal: ModalService,
        public messageSend: MessageSendModalService
    ) {

        activatedRoute.paramMap.subscribe(params => {
            console.log('data: ', params);
            this.loadDefault({ idx: params.get('idx') });
        });
        // this.loadDefault();
    }

    loadDefault(options = {}) {
        this.page_no = 1;
        options = Object.assign({}, { box: this.box, status: this.filterMessage, page_no: this.page_no, limit: this.limit }, options);
        this.loadMessage(options);
    }


    onClickBox(box) {
        this.box = box;
        this.filterMessage = '';
        this.loadMessage({ box: this.box, page_no: 1, limit: this.limit });
    }


    loadMessage(o) {
        this.loading = true;
        this.a.lms.message(o).subscribe(re => {
            this.loading = false;
            // console.log(re);
            this.data = re;
            this.message_count = this.data.messages.length;
        }, e => this.a.toast(e));
    }

    onClickPrevious() {
        this.page_no--;
        this.loadMessage({ box: this.box, status: this.filterMessage, page_no: this.page_no, limit: this.limit });
    }

    onClickNext() {
        this.page_no++;
        this.loadMessage({ box: this.box, status: this.filterMessage, page_no: this.page_no, limit: this.limit });
    }


    onClickMessage(message) {
        // console.log(message);
        message['view'] = !message['view'];
        if (message.open === '0') {
            // console.log("not open");
            this.a.lms.message_opened(message.idx).subscribe(res => {
                // console.log(res);
                message.open = 1;
                this.a.check_message_count();
            }, e => {
                this.a.toast(e);
            });
        }
    }

    onClickReadAll() {
        const data: ModalData = {
            title: this.a.t('MESSAGE READ ALL'),
            content: this.a.t('MESSAGE READ ALL CONFIRM'),
            yes: this.a.t('YES'),
            no: this.a.t('CANCEL')
        };
        this.modal.confirm(data).subscribe(result => {
            if (result) {
                this.a.lms.message_read_all().subscribe(res => {
                    this.loadDefault();
                    this.a.check_message_count();
                }, e => {
                    this.a.toast(e);
                });
            }
        });
    }

}
