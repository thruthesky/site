import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './providers/app.service';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    public a: AppService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toast: ToastController
  ) {
    // console.log(`AppComponent:constructor()`);
    // console.log(`current: ${a.color}, change: black`);
    // a.setColor('black');

    this.initializeApp();
    this.openHomePage();
    this.a.onetimeInitPushMessage();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // alert('platform: is cordova?: ' + this.platform.is('cordova'));

      this.a.isIos = this.platform.is('ios');

      if (this.platform.is('cordova')) {
        // alert('platform: cordova? ' + this.platform.is('cordova'));
        this.statusBar.styleDefault();
        this.splashScreen.hide();



        // this.platform.backButton.subscribe(async () => {
        //   if ( ! this.a.routeUrl || this.a.routeUrl === '/' || this.a.routeUrl === '/#' ) {
        //     if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        //       navigator['app'].exitApp(); // work in ionic 4
        //     } else {
        //       const toast = await this.toast.create({
        //         message: 'Press back button again to exit App',
        //         showCloseButton: true,
        //         position: 'top',
        //         closeButtonText: 'Done',
        //         duration: this.timePeriodToExit
        //       });
        //       toast.present();
        //       this.lastTimeBackPress = new Date().getTime();
        //     }
        //   }
        // });
      } else {
        // alert('This is not cordovva');
      }
    });
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
