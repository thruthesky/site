import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';
import { WithcenterTextService } from '../../withcenter-text.service';

@Component({
    selector: 'about-service-component',
    templateUrl: 'about-service.component.html',
    styleUrls: ['about-service.component.scss']
})

export class AboutServiceComponent implements OnInit {
    show: WithcenterShow = <any>{};
    constructor(
        public t: WithcenterTextService
    ) { }

    ngOnInit() { }
}
