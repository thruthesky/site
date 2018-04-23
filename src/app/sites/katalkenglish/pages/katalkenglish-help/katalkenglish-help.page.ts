import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
  selector: 'katalkenglish-help-page',
  templateUrl: 'katalkenglish-help.page.html',
  styleUrls: ['katalkenglish-help.page.scss'],
})
export class KatalkEnglishHelpPage implements OnDestroy {
  navigationSubscription;
  constructor(
    public a: AppService
  ) {
    console.log(`HelpPage:constructor()`);

  }
  ngOnDestroy() {
    // To avoid memory leaks.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}




