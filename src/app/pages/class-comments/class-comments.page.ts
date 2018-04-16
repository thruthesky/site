
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'class-comments-page',
    templateUrl: 'class-comments.page.html',
    styleUrls: ['class-comments.page.scss'],
})
export class ClassComponentsPage implements OnInit {


    constructor(
        public a: AppService
    ) {

    }

    ngOnInit() {

    }

}

