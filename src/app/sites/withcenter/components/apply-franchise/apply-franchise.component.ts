import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';

@Component({
    selector: 'apply-franchise-component',
    templateUrl: 'apply-franchise.component.html',
    styleUrls: ['apply-franchise.component.scss']
})

export class ApplyFranchiseComponent implements OnInit {

    show: WithcenterShow = <any>{};


    constructor() { }

    ngOnInit() { }

    onSubmitApply(event: Event) {
        event.preventDefault();

        return false;
    }
}

