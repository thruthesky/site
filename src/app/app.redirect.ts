import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'redirect-page',
    template: `Redirecting ...`
})
export class RedirectPage {
    constructor(
        public activatedRoute: ActivatedRoute,
        public route: Router
    ) {
        activatedRoute.queryParamMap.subscribe( re => {
            console.log('Redirecting to: ', re.get('url') );
            this.route.navigateByUrl( re.get('url') );
        });
    }
}

