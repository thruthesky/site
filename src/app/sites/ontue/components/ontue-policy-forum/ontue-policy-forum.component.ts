import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ForumService } from '../../../../providers/forum/forum.service';

@Component({
    selector: 'ontue-policy-forum-component',
    templateUrl: 'ontue-policy-forum.component.html',
    styleUrls: ['ontue-policy-forum.component.scss'],
})
export class OntuePolicyForumComponent implements OnInit {
    policy;
    constructor(
        public a: AppService,
        public forum: ForumService
    ) {
        this.forum.loadPosts({slug: 'policy', page: 1, per_page: 9}).subscribe(re => this.policy = re);
    }

    ngOnInit() {
    }
}



