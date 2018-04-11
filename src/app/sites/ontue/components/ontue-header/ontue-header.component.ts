import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { FireService } from '../../../../modules/firelibrary/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ontue-header',
    templateUrl: 'ontue-header.component.html',
    styleUrls: ['ontue-header.component.scss'],
})
export class OntueHeaderComponent {
    isAdminPage = false;
    constructor(
        private router: Router,
        public a: AppService,
    ) {

        router.events.subscribe(event => {
            if (this.router.url.indexOf('/admin') !== -1) {
                this.isAdminPage = true;
            } else {
                this.isAdminPage = false;
            }
        });
    }
}
