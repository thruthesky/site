import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { SCHEDULE_EDIT_RESPONSE } from '../../../../modules/xapi/lms.service';
import { _CONFIRM_DATA_OPTION, ConfirmModal } from '../../../../components/modal/confirm/confirm.modal';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'ontue-my-schedule-page',
    templateUrl: 'ontue-my-schedule.page.html',
    styleUrls: ['ontue-my-schedule.page.scss']
})
export class OntueMySchedulePage {


    timezone_offset = 0;
    timezone_name = 0;
    time = '';
    timer = null;

    data = null;
    schedules: SCHEDULE_EDIT_RESPONSE;

    loading = false;

    constructor(public a: AppService,
                public dialog: MatDialog
    ) {

        if (a.isLogin && a.isTeacher) {
            this.a.lms.timezone().subscribe(re => {
                this.timezone_name = re['name'];
                this.timezone_offset = parseInt(re['offset'], 10);
            }, () => {
            });
            this.updateTime();

            this.getMySchedule();
        } else {
            this.a.open('teacher');
            this.a.toast('User type must be teacher and should login first...');
        }
    }

    updateTime() {
        if (this.timezone_name) {
            this.time = this.a.lms.localeString(this.timezone_offset);
        }
        this.timer = setTimeout(() => this.updateTime(), 1000);
    }


    onClickScheduleAdd() {
        const idx = this.checkEmptySchedule();
        if (idx) {
            const msg = `Schedule No. ${idx} has no days. You need to delete it before you are going to add or edit a schedule.`;
            // this.a.toast(msg);
            this.a.toast('Warning: Delete Empty Schedule!' + msg);
            return;
        }
        this.a.open('schedule-edit');
    }


    onClickScheduleEdit(idx) {
        console.log('onClickScheduleEdit::idx ', idx);
        this.a.open('schedule-edit', { idx: idx });
    }


    checkEmptySchedule() {
        if (this.data && this.data.schedules && this.data.schedules.length) {
            for (const s of this.data.schedules) {
                if (!s.sunday && !s.monday && !s.tuesday && !s.wednesday && !s.thursday && !s.friday && !s.saturday) {
                    return s.idx;
                }
            }
        }
        return false;
    }

    getMySchedule() {
        this.a.lms.my_schedules().subscribe(re => {
            this.data = re;
        }, e => this.a.toast(e));
    }

    onClickDelete(idx) {
        if (this.a.user.isLogin) {
            const dialogRef = this.dialog.open(ConfirmModal, {
                data: <_CONFIRM_DATA_OPTION>{
                    header: this.a.t('DELETE SCHEDULE'),
                    content: this.a.t('CONFIRM DELETE'),
                    actionYes: this.a.t('YES'),
                    actionNo: this.a.t('CANCEL')
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if ( result ) {
                    this.loading = true;
                    this.a.lms.schedule_delete(idx).subscribe( () => {
                        this.getMySchedule();
                        this.loading = false;
                    }, e => {
                        this.a.toast(e);
                        this.loading = false;
                    });
                }
            });
        }
    }

}

