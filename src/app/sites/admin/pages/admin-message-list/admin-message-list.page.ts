import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { MESSAGES_GROUP } from '../../../../modules/xapi/interfaces';
import { ModalService } from '../../../../providers/modal/modal.service';

@Component({
    selector: 'admin-message-list-page',
    templateUrl: 'admin-message-list.page.html',
    styleUrls: ['admin-message-list.page.scss']
})
export class AdminMessageListPage implements OnInit {

    messages: MESSAGES_GROUP = null;
    teachers_message = {};
    stat_date_begin = 0;
    stat_date_end = 0;

    loader = {
        message: false,
        teacher_message: false,
        teacher_conversation: false
    };

    messageView = false;
    selectedID = null;

    constructor(public a: AppService,
                public modal: ModalService) {

        this.onClickSelectDate();

    }

    ngOnInit() {
    }


    onClickSelectDate(begin = null, end = null) {
        const d = new Date();

        if (begin != null) {
            const begin_date = new Date(d.getTime() - ( begin * 24 * 60 * 60 * 1000));
            this.stat_date_begin = parseInt(begin_date.getFullYear() + this.a.add0((begin_date.getMonth() + 1)) + this.a.add0(begin_date.getDate()), 10);
        } else {
            this.stat_date_begin = parseInt(d.getFullYear() + this.a.add0((d.getMonth() + 1)) + this.a.add0(1), 10);
        }

        if (end != null) {
            const end_date = new Date(d.getTime() + ( end * 24 * 60 * 60 * 1000));
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        } else {
            const end_date = new Date(d.getTime() + ( 24 * 60 * 60 * 1000));
            this.stat_date_end = parseInt(end_date.getFullYear() + this.a.add0((end_date.getMonth() + 1)) + this.a.add0(end_date.getDate()), 10);
        }

        this.loadMessageList();
    }

    loadMessageList() {
        this.loader.message = true;
        this.a.lms.admin_message_list_count({
            date_begin: this.stat_date_begin,
            date_end: this.stat_date_end
        }).subscribe(res => {
            console.log('messages: ', res);
            this.messages = res;
            this.loader.message = false;
        }, e => {
            this.a.toast(e);
            this.loader.message = false;
        });
    }

    // showModalMessage(info) {
    //     let finalMessage = ``;
    //     let seen = ``;
    //     for (const text of info) {
    //         if ( text.open > 0) {
    //             seen = 'Yes';
    //         } else {
    //             seen = 'No';
    //         }
    //         finalMessage = finalMessage +
    //         `<div
    //             style="
    //             margin:2rem 0;
    //             padding:1rem;
    //             border-radius:2px;
    //             border:1px solid rgba(125,125,125,0.2);
    //             line-height: 1.5em;">`
    //         +
    //         `<div style="color:dodgerblue"> Reciever:
    //             <a href="/manager/user-info/` + text.receiver + `" target="_blank">` + text.receiver +
    //                 `<svg style="margin-left: .5rem; width:1em; height:1em" viewBox="0 0 576 512"><path fill="currentColor" d="M195.515 374.828c-4.686-4.686-4.686-12.284 0-16.971l323.15-323.15-.707-.707-89.958.342c-6.627 0-12-5.373-12-12v-9.999c0-6.628 5.372-12 12-12L564 0c6.627 0 12 5.372 12 12l-.343 136c0 6.627-5.373 12-12 12h-9.999c-6.627 0-12-5.373-12-12L542 58.042l-.707-.707-323.15 323.15c-4.686 4.686-12.284 4.686-16.971 0l-5.657-5.657zm232-155.633l-8 8A12 12 0 0 0 416 235.68V464c0 8.837-7.164 16-16 16H48c-8.836 0-16-7.163-16-16V112c0-8.837 7.164-16 16-16h339.976c3.183 0 6.235-1.264 8.485-3.515l8-8c7.56-7.56 2.206-20.485-8.485-20.485H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V227.681c0-10.691-12.926-16.045-20.485-8.486z" fill="currentColor"></path></svg>
    //             </a>
    //         </div>`
    //         +
    //         `Message:` + text.content +
    //         `<div>Seen:` + seen + `</div>` +
    //         `</div>`;
    //     }
    //     if ( info.length > 0 ) {
    //         this.modal.alert({ content: finalMessage});
    //     }
    // }


    showMessage(ID, refresh = false) {
        if ( this.teachers_message[ID] && !refresh ) {
            this.messageView = true;
            return;
        }
        this.teachers_message[ID] = null;
        this.selectedID = ID;
        this.messageView = true;
        this.loader.teacher_message = true;
        this.a.lms.admin_message_list_by_idx_teacher({
            ID: ID,
            date_begin: this.stat_date_begin,
            date_end: this.stat_date_end
        }).subscribe(re => {
            console.log('admin_message_list_by_idx_teacher', re);
            this.loader.teacher_message = false;
            this.teachers_message[ID] = re;
        }, e => {
            this.a.toast(e);
            this.loader.teacher_message = false;
        });
    }

    showConversation(message, refresh = false) {
        if ( message['conversation'] && !refresh ) {
            message['showConversation'] = true;
            return;
        }
        message['conversation'] = null;
        message['showConversation'] = true;
        this.loader.teacher_message = true;
        this.a.lms.admin_message_list_conversation({
            sender: message.sender,
            receiver: message.receiver,
            date_begin: this.stat_date_begin,
            date_end: this.stat_date_end
        }).subscribe(re => {
            console.log('admin_message_list_conversation', re);
            this.loader.teacher_conversation = false;
            message['conversation'] = re;
        }, e => {
            this.a.toast(e);
            this.loader.teacher_conversation = false;
        });
    }

}



