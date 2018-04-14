import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { FireService } from '../../../../modules/firelibrary/core';


@Component({
  selector: 'katalkenglish-home-page',
  templateUrl: 'katalkenglish-home.page.html',
  styleUrls: ['katalkenglish-home.page.scss'],
})
export class KatalkEnglishHomePage {
  constructor(
    public a: AppService,
    public fire: FireService
  ) {
    console.log(`KatalkEnglisHomePage:;constructor()`);
    a.language.resetUserLanguage('en');
  }
}

