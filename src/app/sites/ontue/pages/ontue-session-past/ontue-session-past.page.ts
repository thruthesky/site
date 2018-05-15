import { Component } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../../../providers/app.service';


@Component({
  selector: 'ontue-session-past-page',
  templateUrl: 'ontue-session-past.page.html',
  styleUrls: ['ontue-session-past.page.scss'],
})
export class OntueSessionPastPage {

    page = 'session-past';
    share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> {options: false};
  constructor(
    public a: AppService
  ) {


  }
}


