import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'katalkenglish-help-page',
  templateUrl: 'katalkenglish-help.page.html',
  styleUrls: ['katalkenglish-help.page.scss'],
})
export class KatalkEnglishHelpPage implements OnDestroy {
  navigationSubscription;
  constructor(
    public router: Router,
    public a: AppService
  ) {
    console.log(`HelpPage:constructor()`);
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log('Component revisited. You can reset all the component data here to make it refreshed/reloaed.');
      }
    });

  }
  ngOnDestroy() {
    // To avoid memory leaks.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}




