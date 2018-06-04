import { Component, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { WP_POST } from '../../providers/forum.service';


@Component({
    selector: 'forum-posts-component',
    templateUrl: 'forum-posts.component.html',
    styleUrls: ['forum-posts.component.scss'],
})
export class ForumPostsComponent {

    @Input() posts: Array<WP_POST> = [];

    constructor(public a: AppService) {

    }
}

