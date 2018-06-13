import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AppService } from '../app.service';



export interface WP_POST {
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
    categories: Array<string>;
}

export interface LOAD_OPTIONS {
    slug: string;
    per_page: number;
    page: number;
}


@Injectable()
export class ForumService {


    constructor(
        public http: HttpClient,
        public a: AppService
    ) {

    }


    loadPosts(options: LOAD_OPTIONS): Observable<Array<WP_POST>> {
        const slug = options.slug;
        let url = environment['urlBackend'] + '/wp-json/wp/v2/posts?categories=' + environment['categories'][slug];
        if (options.per_page) {
            url += '&per_page=' + options.per_page;
        }
        if (options.page) {
            url += '&page=' + options.page;
        }
        // console.log('url: ', url);
        return this.http.get<Array<WP_POST>>(url);
    }

    getLatestPost(slug): Observable<any> {
        return this.loadPosts({ slug: slug, per_page: 1, page: 1 });
    }

    getPostBySlug(slug: string, ln?: string): Observable<Array<WP_POST>> {
        let url = environment['urlBackend'] + '/wp-json/wp/v2/posts?slug=' + slug;
        if (ln) {
            url = url + '-' + ln;
        }
        // console.log('getPostBySlug', url);
        return this.http.get<Array<WP_POST>>(url);
    }

    getPost(id): Observable<WP_POST> {
        const url = environment['urlBackend'] + '/wp-json/wp/v2/posts/' + id;
        // console.log('loadPosts', url);
        return this.http.get<WP_POST>(url);
    }


    /**
     * Warning: if the post has two or more categories, it will not work.
     * @param categories categories
     */
    getSlug(categories: Array<string>): string {
        if (!categories || !categories.length) {
            return '';
        }
        // console.log('categories: ', categories, environment.categories);
        const needle = parseInt(categories[0], 10);
        for (const slug of Object.keys(environment.categories)) {
            if (environment.categories[slug] === needle) {
                // console.log('Got it: return: ', slug);
                return slug;
            }
        }
        return '';
    }
    isReminder(categories: Array<string>) {
        return this.getSlug(categories).indexOf('reminders') >= 0;
    }
    isPolicy(categories: Array<string>) {
        return this.getSlug(categories).indexOf('policy') >= 0;
    }
    isTermsAndConditions(categories: Array<string>) {
        return this.getSlug(categories).indexOf('termsandconditions') >= 0;
    }
    getForumName(post: WP_POST) {
        if (this.isReminder(post.categories)) {
            return this.a.ln.REMINDER;
        } else if (this.isPolicy(post.categories)) {
            // console.log('got policy');
            return this.a.ln.POLICY;
        } else if (this.isTermsAndConditions(post.categories)) {
            return this.a.ln.TERMS_AND_CONDITIONS;
        }
        return '';
    }
}

