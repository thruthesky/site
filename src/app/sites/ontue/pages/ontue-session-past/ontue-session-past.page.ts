import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
  selector: 'ontue-session-past-page',
  templateUrl: 'ontue-session-past.page.html',
  styleUrls: ['ontue-session-past.page.scss'],
})
export class OntueSessionPastPage {
  constructor(
    public a: AppService
  ) {


  }
}


