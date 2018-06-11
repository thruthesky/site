import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


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
}

export interface LOAD_OPTIONS {
    slug: string;
    per_page: number;
    page: number;
}


@Injectable()
export class ForumService {


    constructor(public http: HttpClient) {

    }


    loadPosts(options: LOAD_OPTIONS): Observable<Array<WP_POST>> {
        const slug = options.slug;
        let url = environment['urlBackend'] + '/wp-json/wp/v2/posts?categories=' + environment['categories'][slug];
        if (options.per_page) {
            url += '&per_paeg=' + options.per_page;
        }
        if (options.page) {
            url += '&page=' + options.page;
        }
        return this.http.get<Array<WP_POST>>(url);
    }

    getLatestPost(slug): Observable<any> {
        return this.loadPosts({slug: slug, per_page: 1, page: 1});
    }

    getPostBySlug(slug: string, ln?: string): Observable<any> {
        let url = environment['urlBackend'] + '/wp-json/wp/v2/posts?slug=' + slug;
        if ( ln ) {
            url = url + '-' + ln;
        }
        // console.log('getPostBySlug', url);
        return this.http.get(url);
    }

    getPost(id): Observable<any> {
        const url = environment['urlBackend'] + '/wp-json/wp/v2/posts/' + id;
        // console.log('loadPosts', url);
        return this.http.get(url);
    }


}

