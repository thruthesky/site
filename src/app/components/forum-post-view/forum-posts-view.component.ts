import { Component, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { WP_POST } from '../../providers/forum.service';


@Component({
    selector: 'forum-post-view-component',
    templateUrl: 'forum-post-view.component.html',
    styleUrls: ['forum-post-view.component.scss'],
})
export class ForumPostViewComponent {

    @Input() post: WP_POST = {};

    constructor(public a: AppService) {

    }
}

