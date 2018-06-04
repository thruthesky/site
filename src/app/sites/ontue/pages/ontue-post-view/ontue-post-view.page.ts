import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ForumService, WP_POST } from '../../../../providers/forum.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'ontue-post-view-page',
    templateUrl: 'ontue-post-view.page.html',
    styleUrls: ['ontue-post-view.page.scss']
})

export class OntuePostViewPage {

    posts: Array<WP_POST> = [];

    constructor(
        public a: AppService,
        public sanitizer: DomSanitizer,
        public forum: ForumService
    ) {


        this.forum.getPost('teacher-policy').subscribe((post: WP_POST) => {
            console.log('post: ', post);
            if (post) {
                this.post = post;
                post.content.rendered = <any> this.sanitizer.bypassSecurityTrustHtml(post.content.rendered);
            }
        }, e => console.error(e));
    }


}
