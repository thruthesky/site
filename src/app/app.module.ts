import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppService } from './providers/app.service';
// import { FireService, FirelibraryModule } from './modules/firelibrary/core';

import { OntueHeaderComponentModule } from './sites/ontue/components/ontue-header/ontue-header.component.module';
import {
  KatalkEnglishHeaderComponentModule
} from './sites/katalkenglish/components/katalkenglish-header/katalkenglish-header.component.module';

import { LanguageService } from './providers/language.service';
import { XapiModule, XapiService, XapiUserService, XapiLMSService, XapiFileService } from './modules/xapi/xapi.module';
// import { TranslatePipeModule } from './modules/firelibrary/pipes/translate/translate.pipe.module';
import { KatalkEnglishFooterComponentModule } from './sites/katalkenglish/components/katalkenglish-footer/katalkenglish-footer.component.module';
import { OntueFooterComponentModule } from './sites/ontue/components/ontue-footer/ontue-footer.component.module';
import { RedirectPage } from './app.redirect';
import { SiteService } from './providers/site.service';
import { UrlService } from './providers/url.service';
// import { TranslatePipe } from './pipes/translate/translate.pipe';
// import { TranslatePipeModule } from './pipes/translate/translate.pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    RedirectPage
  ],
  entryComponents: [
    RedirectPage
  ],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // FirelibraryModule.forRoot({ functions: true }),
    OntueHeaderComponentModule,
    OntueFooterComponentModule,
    KatalkEnglishHeaderComponentModule,
    KatalkEnglishFooterComponentModule,
    XapiModule
  ],
  providers: [
    // FireService,
    AppService,
    LanguageService,
    SiteService,
    UrlService,
    XapiService, XapiUserService, XapiFileService, XapiLMSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor() {

  }
}


