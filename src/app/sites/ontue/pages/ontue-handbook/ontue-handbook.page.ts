import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ForumService, WP_POST } from '../../../../providers/forum.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'ontue-handbook-page',
    templateUrl: 'ontue-handbook.page.html',
    styleUrls: ['ontue-handbook.page.scss']
})

export class OntueHandbookPage {

    posts: Array<WP_POST> = [];

    constructor(
        public a: AppService,
        public sanitizer: DomSanitizer,
        public forum: ForumService
    ) {
        this.forum.loadPosts('teacher-policy').subscribe((posts: Array<WP_POST>) => {
            console.log('posts: ', posts);

            if (posts && posts.length) {

                this.posts = posts;
                for (const post of posts) {
                    post.content.rendered = <any> this.sanitizer.bypassSecurityTrustHtml(post.content.rendered);
                }

            }
        }, e => console.error(e));
    }



}
