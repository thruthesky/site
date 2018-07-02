import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ForumService, WP_POST } from '../../../../providers/forum/forum.service';

interface Row { domain: string; cnt: string; }
interface Stat {
    domains: Array<Row>;
    platforms: { [platform: string]: number };
    no_of_user: number;
    no_of_teacher: number;
    no_of_student: number;
    no_of_test_user: number;
}

@Component({
    selector: 'admin-push-notification-page',
    templateUrl: 'admin-push-notification.page.html',
    styleUrls: ['admin-push-notification.page.scss']
})

export class AdminPushNotificationPage implements OnInit {

    form = {
        user_type: '',
        domain: '',
        urlDomain: '',
        email: '',
        postId: '',
        url: '',
        title: '',
        body: ''
    };
    post: WP_POST = <any>{};
    stat: Stat = <any>{};
    loader = {
        send: false
    };

    constructor(
        public a: AppService,
        public forum: ForumService
    ) {
        a.lms.admin_push_token_stat().subscribe((stat: Stat) => {
            // console.log('res: ', stat);
            const domains = stat.domains;
            const merged: Array<Row> = [];
            if (domains && domains.length) {
                for (const row of stat.domains) {
                    // debugger;
                    // const domain = row.domain;
                    const bare = row.domain.replace('www.', '');
                    const i = merged.findIndex(v => {
                        // console.log('v: ', v.domain, ', bare: ', bare);
                        return v.domain === bare;
                    });
                    // console.log('i: ', i);
                    if (i !== -1) {
                        merged[i].cnt = (parseInt(row.cnt, 10) + parseInt(merged[i].cnt, 10)) + '';
                    } else {
                        const o = <Row>{};
                        o['domain'] = bare;
                        o['cnt'] = row.cnt;
                        merged.push(o);
                    }
                }
                stat.domains = merged;
            }
            this.stat = stat;
        });

        if (!a.isSuperManager) {
            this.form.domain = this.a.user.manager;
        }
    }

    ngOnInit() { }

    keys(obj) {
        return Object.keys(obj);
    }
    onSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.loader.send = true;
        this.form.url = `https://${this.form.urlDomain}/post/${this.form.postId}`;
        this.a.lms.admin_push_send(this.form).subscribe(res => {
            // console.log('onSubmit()', res);
            this.loader.send = false;
            this.a.toast('Push Notification success.');
        }, e => {
            this.a.toast(e);
            this.loader.send = false;
        });

        return false;
    }

    onClickCheck() {
        this.forum.getPost(this.form.postId).subscribe(re => {
            // console.log('re: post: ', re);
            this.post = re;
            this.form.title = this.a.stripTags(this.post.title.rendered);
            this.form.body = this.a.stripTags(this.post.content.rendered).substr(0, 64);
        }, e => this.a.toast(e));
    }
}



