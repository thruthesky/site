
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../providers/app.service';
import { USER_DATA_RESPONSE } from '../../../modules/xapi/interfaces';

@Component({
    selector: 'user-info-page',
    templateUrl: 'user-info.page.html',
    styleUrls: ['user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
    user: USER_DATA_RESPONSE = {};
    show = {
        loader: {
            profile_info: true,
            profile_update: false
        }
    };
    pointForm = {
        apply: '',
        point: '',
        reason: '',
        payment_method: '',
        amount: '',
        currency: ''
    };

    constructor(
        public active: ActivatedRoute,
        public a: AppService
    ) {
        active.paramMap.subscribe( params => {
            console.log('params:', params.get('ID'));
            this.loadInfo( params.get('ID'));
        });

    }

    ngOnInit() {

    }

    loadInfo(ID) {

        const sql = `SELECT * FROM wp_users WHERE BRANCH AND ID=${ID}`;
        this.a.lms.admin_query({
            sql: sql,
        }).subscribe(re => {
            this.show.loader.profile_info = false;
            if ( re && re.length ) {
                this.user = re[0];
                /**
                 * Default, it should be student.
                 */
                if ( this.user.user_type === '' ) {
                    this.user.user_type = 'S';
                }
            } else {
                this.a.toast('You are not Manager of this user.');
            }
            console.log(re);
        }, e => this.a.toast(e));
    }
    onSubmitUserInfo(event: Event) {
        event.preventDefault();

        console.log(this.user);
        const u = this.user;
        const up = {
            route: 'lms.admin_user_update',
            session_id: this.a.user.sessionId,
            ID: u.ID,
            user_pass: u.user_pass,
            // email: u.user_email,
            user_type: u.user_type,
            display_name: u.display_name,
            name: u.name,
            gender: u.gender,
            phone_number: u.phone_number,
            kakaotalk_id: u.kakaotalk_id,
            grade: u.grade,
            list_order: u.list_order,
            bookable_time: u.bookable_time,
            block_free_class_until: u.block_free_class_until,
            timezone: u.timezone,
            domain: u.domain,
            manager: u.manager
        };
        this.show.loader.profile_update = true;
        this.a.xapi.post( up ).subscribe( re => {
            this.show.loader.profile_update = false;
            console.log('admin_user_update', re);
        }, e => this.a.toast(e));
        return false;
    }
}

