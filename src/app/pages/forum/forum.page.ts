import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../../providers/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../providers/modal/modal.service';


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
    slug = '';
    title = '';
    page = 1;
    showLoader = true;
    noMorePage = false;
    constructor(
        activated: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public http: HttpClient,
        public a: AppService,
        public modal: ModalService
    ) {
        activated.data.subscribe(data => {
            // console.log('data: ', data);
            this.slug = data['slug'];
            if (this.slug === 'termsandconditions') {
                this.title = this.a.ln.TERMS_AND_CONDITIONS;
            } else if (this.slug === 'student_reminders' || this.slug === 'teacher_reminders') {
                this.title = this.a.ln['REMINDER'];
            } else if (this.slug === 'policy') {
                this.title = this.a.ln.POLICY;
            }
            this.loadPosts(data['slug']);
        });
    }


    ngOnInit() { }

    loadPosts(slug: string) {

        // console.log('slug: ', slug);
        // console.log(this.a.environment.categories);
        this.showLoader = true;
        const url = this.a.urlBackend + '/wp-json/wp/v2/posts?categories=' + this.a.environment.categories[slug] + '&page=' + this.page;

        // console.log('api: ', url);


        this.http.get(url, { observe: 'response' }).subscribe((resp) => {
            const posts: Array<WP_POST> = <any>resp.body;
            // const keys = resp['headers'].keys();
            // for (const k of keys) {
            //     // console.log(`${k} = ` + resp.headers.get(k) + ' === ' + this.page);
            //     // let total = k;
            //     const total = resp.headers.get(k);
            //     console.log(k, total, this.page);
            //     if ( k === 'x-wp-totalpages' && total === this.page  ) {
            //         this.noMorePage = true;
            //     }
            // }

            const totalpages = resp.headers.get('x-wp-totalpages');
            console.log('total', totalpages);
            if (totalpages === `${this.page}`) {
                this.noMorePage = true;
            }
            if (posts && posts.length) {
                // this.posts = posts;
                for (const post of posts) {
                    post.content.rendered = <any>this.sanitizer.bypassSecurityTrustHtml(post.content.rendered);
                    this.posts.push(post);
                }
            } else {
                this.modal.alert({ content: this.a.ln['SLUG_IS_EMPTY'] });
            }
            this.showLoader = false;


        }, e => {
            console.log(e);
            this.showLoader = false;
        });
    }

    loadMorePosts() {
        this.page++;
        this.loadPosts(this.slug);
    }

}



