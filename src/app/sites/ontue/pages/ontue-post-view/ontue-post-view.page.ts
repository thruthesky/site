import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ForumService, WP_POST } from '../../../../providers/forum.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'ontue-post-view-page',
    templateUrl: 'ontue-post-view.page.html',
    styleUrls: ['ontue-post-view.page.scss']
})

export class OntuePostViewPage {

    post: WP_POST = <WP_POST>{};

    constructor(
        public a: AppService,
        public sanitizer: DomSanitizer,
        public forum: ForumService,
        public activated: ActivatedRoute
    ) {

        activated.paramMap.subscribe( params => {
            if ( params.get('id') ) {
                this.forum.getPost( params.get('id') ).subscribe((post: WP_POST) => {
                    console.log('post: ', post);
                    if (post) {
                        this.post = post;
                        post.content.rendered = <any> this.sanitizer.bypassSecurityTrustHtml(post.content.rendered);
                    }
                }, e => console.error(e));
            }
        });
    }


}
