import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../../providers/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


interface WP_POST {
    author: number;
    content: {
        protected: boolean;
        rendered: string;
    };
    date: string;
    guid: string;
    link: string;
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
}
@Component({
    selector: 'forum-page',
    templateUrl: 'forum.page.html',
    styleUrls: ['forum.page.scss']
})

export class ForumPage implements OnInit {
    posts: Array<WP_POST> = [];
    constructor(
        activated: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public http: HttpClient,
        public a: AppService
    ) {
        activated.data.subscribe(data => {
            console.log('data: ', data);
            this.loadPosts( data['slug'] );
        });
    }


    ngOnInit() { }

    loadPosts( slug: string ) {

        const url = this.a.urlBackend + '/wp-json/wp/v2/posts?categories=' + this.a.environment['categories'][slug];
        console.log('api: ', url);


        this.http.get(url).subscribe((posts: Array<WP_POST>) => {
            console.log('posts: ', posts);

            if (posts && posts.length) {

                this.posts = posts;
                for (const post of posts) {
                    post.content.rendered = <any> this.sanitizer.bypassSecurityTrustHtml( post.content.rendered );
                }

            }
        }, e => console.error(e));
    }
}



