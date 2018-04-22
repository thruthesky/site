import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
  selector: 'katalkenglish-session-past-page',
  templateUrl: 'katalkenglish-session-past.page.html',
  styleUrls: ['katalkenglish-session-past.page.scss'],
})
export class KatalkEnglishSessionPastPage {
  constructor(
    public a: AppService
  ) {


  }
}


