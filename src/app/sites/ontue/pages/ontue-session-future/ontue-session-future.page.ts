import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
  selector: 'ontue-session-future-page',
  templateUrl: 'ontue-session-future.page.html',
  styleUrls: ['ontue-session-future.page.scss'],
})
export class OntueSessionFuturePage {
  constructor(
    public a: AppService
  ) {


  }
}

