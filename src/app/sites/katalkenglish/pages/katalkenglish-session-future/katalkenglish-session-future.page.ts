import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
  selector: 'katalkenglish-session-future-page',
  templateUrl: 'katalkenglish-session-future.page.html',
  styleUrls: ['katalkenglish-session-future.page.scss'],
})
export class KatalkEnglishSessionFuturePage {
  constructor(
    public a: AppService
  ) {


  }
}


