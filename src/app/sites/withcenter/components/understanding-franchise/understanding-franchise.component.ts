import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';
import { WithcenterTextService } from '../../withcenter-text.service';

@Component({
    selector: 'understanding-franchise-component',
    templateUrl: 'understanding-franchise.component.html',
    styleUrls: ['understanding-franchise.component.scss']
})
export class UnderstandingFranchiseComponent implements OnInit {
    show: WithcenterShow = <any>{};
    constructor(
        public t: WithcenterTextService
    ) { }

    ngOnInit() { }
}


