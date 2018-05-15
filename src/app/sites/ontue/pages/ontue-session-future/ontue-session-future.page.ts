import { Component } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../../../providers/app.service';


@Component({
  selector: 'ontue-session-future-page',
  templateUrl: 'ontue-session-future.page.html',
  styleUrls: ['ontue-session-future.page.scss'],
})
export class OntueSessionFuturePage {

    page = 'session-future';
    share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> {options: false};

    constructor(
    public a: AppService
  ) {


  }
}

