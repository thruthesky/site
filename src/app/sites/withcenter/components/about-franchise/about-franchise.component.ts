import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';
import { WithcenterTextService } from '../../withcenter-text.service';

@Component({
    selector: 'about-franchise-component',
    templateUrl: 'about-franchise.component.html',
    styleUrls: ['about-franchise.component.scss']
})
export class AboutFranchiseComponent implements OnInit {
    show: WithcenterShow = <any>{};
    constructor(
        public t: WithcenterTextService
    ) { }

    ngOnInit() { }
}


