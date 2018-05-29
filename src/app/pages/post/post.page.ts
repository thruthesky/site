import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'post-page',
    templateUrl: 'post.page.html',
    styleUrls: ['post.page.scss']
})

export class PostPage implements OnInit {
    post;
    constructor(
        activated: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public http: HttpClient,
        public a: AppService
    ) {
        activated.paramMap.subscribe(params => {
            const url = this.a.urlBackend + '/wp-json/wp/v2/posts/' + params.get('ID');
            console.log('api: ', url);
            this.http.get(url).subscribe( post => {
                this.post = post;
                this.post['safe_content'] = this.sanitizer.bypassSecurityTrustHtml( this.post.content.rendered );
            });
        });
    }

    ngOnInit() { }
}
