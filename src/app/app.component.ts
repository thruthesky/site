import { Component, OnInit } from '@angular/core';
import { AppService } from './providers/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    public a: AppService
  ) {
    // console.log(`AppComponent:constructor()`);
    // console.log(`current: ${a.color}, change: black`);
    // a.setColor('black');

    this.openHomePage();
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
      console.log('It has segment !!');
    } else {
      /**
       * If no route accessed. You need to show first page of each domain.
       */
      console.log('It has no segment. Opening front page of this domain', this.a.getDomain());
      this.a.openHome();
    }

  }
}
