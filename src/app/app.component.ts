import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './providers/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    public a: AppService
  ) {
    // console.log(`AppComponent:constructor()`);
    // console.log(`current: ${a.color}, change: black`);
    // a.setColor('black');

    this.openHomePage();
    this.a.onetimeInitPushMessage();
  }



  ngAfterViewInit() {
    /**
     * Loading paypal express javascript dynamically. It must be inside `AfterViewInit` because it needs HEAD DOM to be ready.
     */
    setTimeout(() => this.loadScript('https://www.paypalobjects.com/api/checkout.js'), 100);
  }

  /**
   * Returns a promise of loading javascript.
   * @param scriptUrl url of javascript to load
   */
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      /**
       * @note it adds the javascript at the end of body tag. NOT in head tag.
       */
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }


  ngOnInit() {
  }
  /**
   * Open homepage based on the domain that user visited.
   */
  openHomePage() {

    /**
     * Check if any route is accessed.
     */
    const segments = this.a.getQuerySegments();
    if (segments.length) {
      // console.log('It has segment !!');
    } else {
      /**
       * If no route accessed. You need to show first page of each domain.
       */
      // console.log('It has no segment. Opening front page of this domain', this.a.getDomain());
      this.a.openHome();
    }

  }
}
