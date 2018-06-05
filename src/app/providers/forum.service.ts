import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


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


@Injectable()
export class ForumService {



    constructor(
        public http: HttpClient
    ) {

    }


    loadPosts(options?): Observable<any> {
        let slug = '';
        let per_page = '';
        if (typeof options === 'string') {
            slug = options;
        } else {
            slug = options.slug;

        }
        const url = environment['urlBackend'] + '/wp-json/wp/v2/posts?categories=' + environment['categories'][slug];
        console.log('loadPosts', url);
        return this.http.get(url);
    }

    getLatestPost(slug) {
        return this.loadPosts({ slug: slug, per_page: 1, page_no: 1 });
    }

    getPost(id): Observable<any> {
        const url = environment['urlBackend'] + '/wp-json/wp/v2/posts/' + id;
        console.log('loadPosts', url);
        return this.http.get(url);
    }



}

