import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ForumService, WP_POST } from '../../providers/forum/forum.service';

@Component({
    selector: 'post-page',
    templateUrl: 'post.page.html',
    styleUrls: ['post.page.scss']
})

export class PostPage implements OnInit {
    post: WP_POST;
    constructor(
        activated: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public http: HttpClient,
        public a: AppService,
        public forum: ForumService
    ) {
        activated.paramMap.subscribe(params => {
            // const url = this.a.urlBackend + '/wp-json/wp/v2/posts/' + params.get('ID');
            // // console.log('api: ', url);
            // this.http.get(url).subscribe(post => {
            //     this.post = post;
            //     this.post['safe_content'] = this.sanitizer.bypassSecurityTrustHtml(this.post.content.rendered);
            // }, e => a.toast(e));
            if ( params.get('ID') ) {
                this.forum.getPost( params.get('ID') ).subscribe( post => {
                    this.post = post;
                    this.post.date = (new Date(this.post.date)).toLocaleDateString();
                    this.post['safe_content'] = this.sanitizer.bypassSecurityTrustHtml(this.post.content.rendered);

                    this.post['forum_name'] = forum.getForumName(post);
                }, e => a.toast(e));
            } else {
                a.toast( a.ln.MISSING_ID );
            }
        });
    }

    ngOnInit() { }
}
