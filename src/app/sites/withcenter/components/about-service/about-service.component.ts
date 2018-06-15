import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';

@Component({
    selector: 'about-service-component',
    templateUrl: 'about-service.component.html',
    styleUrls: ['about-service.component.scss']
})

export class AboutServiceComponent implements OnInit {
    show: WithcenterShow = <any>{};
    constructor() { }

    ngOnInit() { }
}
