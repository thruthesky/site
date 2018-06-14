import { Component, OnInit } from '@angular/core';
import { WithcenterShow } from '../../interfaces';

@Component({
    selector: 'about-franchise-component',
    templateUrl: 'about-franchise.component.html',
    styleUrls: ['about-franchise.component.scss']
})
export class AboutFranchiseComponent implements OnInit {
    show: WithcenterShow = <any>{};
    constructor() { }

    ngOnInit() { }
}


