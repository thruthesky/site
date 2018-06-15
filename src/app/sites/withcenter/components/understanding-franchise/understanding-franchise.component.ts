import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';

@Component({
    selector: 'understanding-franchise-component',
    templateUrl: 'understanding-franchise.component.html',
    styleUrls: ['understanding-franchise.component.scss']
})
export class UnderstandingFranchiseComponent implements OnInit {
    show: WithcenterShow = <any>{};
    constructor() { }

    ngOnInit() { }
}


