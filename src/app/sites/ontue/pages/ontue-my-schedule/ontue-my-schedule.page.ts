import {Component} from '@angular/core';
import {AppService} from '../../../../providers/app.service';
import {SCHEDULE_EDIT_RESPONSE} from '../../../../modules/xapi/lms.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ConfirmModal } from '../../../../components/modal/confirm/confirm.modal';
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
                public alertCtrl: AlertController,
                public router: Router,
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
            this.router.navigateByUrl('/teacher');
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

        this.router.navigate(['/schedule-edit']);
    }


    onClickScheduleEdit(idx) {
        console.log('onClickScheduleEdit::idx ', idx);
        this.router.navigate(['/schedule-edit'], { queryParams: { idx: idx } });
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

    async onClickDelete(idx) {
        if (this.a.user.isLogin) {
            // const confirm = await this.alertCtrl.create({
            //     header: this.a.t('DELETE SCHEDULE'),
            //     subHeader: this.a.t('CONFIRM DELETE'),
            //     buttons: [
            //         {
            //             text: this.a.t('YES'),
            //             handler: () => {
            //                 this.loading = true;
            //                 this.a.lms.schedule_delete(idx).subscribe(res => {
            //                     this.getMySchedule();
            //                     this.loading = false;
            //                 }, e => {
            //                     this.a.toast(e);
            //                     this.loading = false;
            //                 });
            //             }
            //         },
            //         {
            //             text: this.a.t('CANCEL'),
            //             handler: () => {
            //             }
            //         }
            //     ]
            // });
            // confirm.present();


            const dialogRef = this.dialog.open(ConfirmModal, {
            });

            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed', result);
            });
        }
    }

}

