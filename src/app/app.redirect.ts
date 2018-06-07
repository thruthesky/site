import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './providers/app.service';

@Component({
    selector: 'redirect-page',
    template: `
        <main class="pt-5">{{ a.ln.REDIRECTING }}</main>
    `
})
export class RedirectPage {
    constructor(
        public activatedRoute: ActivatedRoute,
        public route: Router,
        public a: AppService
    ) {
        activatedRoute.queryParamMap.subscribe( re => {
            // console.log('Redirecting to: ', re.get('url') );
            this.route.navigateByUrl( re.get('url') );
        });
    }
}

